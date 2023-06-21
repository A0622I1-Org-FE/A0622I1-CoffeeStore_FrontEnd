import {Component, OnInit} from '@angular/core';
import {IServices} from '../../../modal/IServices';
import {ServicesService} from '../../../service/services.service';
import {IBillDetail} from '../../../modal/IBillDetail';
import {ServiceTypeService} from '../../../service/service-type.service';
import {IServiceType} from '../../../modal/IServiceType';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order} from '../../../modal/order';
import {InsertBillDTO} from '../../../dto/insert-bill-dto';
import {BillService} from '../../../service/bill.service';
import {formatDate} from '@angular/common';
import {BillDTO} from '../../../dto/bill-dto';
import {InsertBillDetailDTO} from '../../../dto/insert-bill-detail-dto';
import {BillDetailService} from '../../../service/bill-detail.service';
import {ScoketServiceService} from '../../../service/socket/scoket-service.service';
import {ToastrService} from 'ngx-toastr';
import {Message} from '../../../modal/message';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  serviceList: IServices[];
  serviceTypeList: IServiceType[];
  orderList: Order[] = [];
  check = 'button';
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 3;
  id: number;
  pages: number[];
  pageRange: number[];
  noRecord: boolean;
  typeId = 0;
  serviceChon: IServices;
  rfCreate: FormGroup;
  tongTien = 0;
  deleteOrder: Order;
  index: number;
  insertBill: InsertBillDTO;
  getBill: BillDTO;
  billDetail: InsertBillDetailDTO;
  showMe: boolean;
  isShowErrMsg = false;
  submitted = false;
  messList: Message[] = [];
  stompClient: any;

  constructor(private servicesService: ServicesService,
              private serviceTypeService: ServiceTypeService,
              private billService: BillService,
              private serviceMessage: ServicesService,
              private billDetailService: BillDetailService,
              private scoketServiceService: ScoketServiceService,
              private toastrService: ToastrService) {
    this.scoketServiceService.connect();
  }

  get f() { return this.rfCreate.controls; }
  ngOnInit(): void {
    this.servicesService.findAll(this.currentPage, this.pageSize).subscribe(response => {
        this.serviceList = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
      },
      error => {
        this.noRecord = error.status === 404;
        this.serviceList = [];
      });
    this.serviceTypeService.findAll().subscribe(response => {
      this.serviceTypeList = response;
    });
  }

  doCheck(quantity: string) {
    if ( parseInt(quantity) < 1) {
      this.isShowErrMsg = true;
    } else {
      this.isShowErrMsg = false;
      this.order();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getList();
    this.countPageCanShow();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getList();
    }
    this.countPageCanShow();
  }

  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getList();
    }
    this.countPageCanShow();
  }

  getListType() {
    this.servicesService.searchTypeId(this.typeId, this.currentPage, this.pageSize).subscribe(response => {
        this.serviceList = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
      },
      error => {
        this.noRecord = error.status === 404;
        this.serviceList = [];
      });
  }

  getList() {
    if (this.typeId === 0) {
      this.ngOnInit();
    } else {
      this.getListType();
    }
  }

  sreachType(id: number) {
    this.currentPage = 0;
    this.typeId = id;
    this.getList();
  }

  findAll() {
    this.typeId = 0;
    this.getList();
  }

  chon(service: IServices) {
    this.serviceChon = service;
    this.rfCreate = new FormGroup({
      service_id: new FormControl(this.serviceChon.id),
      name: new FormControl(this.serviceChon.name),
      quantity: new FormControl(1),
      price: new FormControl(this.serviceChon.price),
      sum: new FormControl(0)
    });
  }

  formatter(money) {
    const formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    });
    return formatter.format(money).replace('₫', '');
  }

  order() {
    this.tongTien = 0;
    const order = this.rfCreate.value;
    let addNewService = true;
    order.sum = order.quantity * order.price;
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.rfCreate.value.service_id === this.orderList[i].service_id) {
        this.orderList[i].quantity += this.rfCreate.value.quantity;
        addNewService = false;
      }
    }
    if (addNewService) {
      this.orderList.push(order);
    }
    this.orderList.forEach(item => this.tongTien += (item.quantity * item.price));
  }

  delete() {
    this.orderList = this.orderList.filter(item => item.name !== this.deleteOrder.name);
  }

  lay(order: Order) {
    this.deleteOrder = order;
  }

  getBillTable() {
    this.billService.getBill(1).subscribe(next => {
      console.log(next);
      if (next === null) {
        this.insertBill = {
          payment_status: 0,
          payment_time: '',
          table_id: 1,
          user_id: 2
        };
        this.billService.insertBill(this.insertBill).subscribe(item => {
          this.getBillTable();
        });
      } else {
        for (let i = 0; i < this.orderList.length; i++) {
          this.billDetail = {
            quantity: this.orderList[i].quantity,
            bill_id: next.id,
            service_id: this.orderList[i].service_id
          };
          this.billDetailService.insertBillDetail(this.billDetail).subscribe(nextB => {
            this.orderList = [];
          });
        }
      }
    });
  }

  insertBillDto() {
    // this.getBillTable();
    // const mess = 'Bàn 1 gọi order món';
    this.scoketServiceService.sendMessage('Bàn 1 gọi order món');
    // console.log(this.scoketServiceService.sendMessage('Bàn 1 gọi order món'));
  }

  goiPhucVu() {
    this.serviceMessage.getMessage().subscribe(data => {
      this.messList = data;
    });
    // this.stompClient = this.scoketServiceService.connect();
    // this.stompClient.connect({}, (frame) => {
    //   console.log(frame);
    //   this.stompClient.subscribe('/topic/list/service', data => {
    //     this.mes = '' + JSON.parse(data.body).text;
    //     // this.toastrService.success(mess);
    //   });
    // });
    this.scoketServiceService.sendMessage('Bàn 1 gọi phục vu');
    // console.log(this.mes);
  }
}
