import {Component, OnInit} from '@angular/core';
import {IServices} from '../../../modal/IServices';
import {ServicesService} from '../../../service/services.service';
import {ServiceTypeService} from '../../../service/service-type.service';
import {IServiceType} from '../../../modal/IServiceType';
import {FormGroup} from '@angular/forms';
import {Order} from '../../../modal/order';
import {InsertBillDTO} from '../../../dto/insert-bill-dto';
import {BillService} from '../../../service/bill.service';
import {BillDTO} from '../../../dto/bill-dto';
import {InsertBillDetailDTO} from '../../../dto/insert-bill-detail-dto';
import {BillDetailService} from '../../../service/bill-detail.service';
import {ScoketServiceService} from '../../../service/socket/scoket-service.service';
import {ToastrService} from 'ngx-toastr';
import {Message} from '../../../modal/message';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

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
  isShowErrMsg = false;
  messList: Message[] = [];
  stompClient: any;
  tableId: number;
  order1: Order;

  constructor(private servicesService: ServicesService,
              private serviceTypeService: ServiceTypeService,
              private billService: BillService,
              private billDetailService: BillDetailService,
              public scoketServiceService: ScoketServiceService,
              private titleService: Title,
              private activateRouter: ActivatedRoute,
              private toastrService: ToastrService) {
    this.scoketServiceService.connect();
    this.titleService.setTitle('Màn hình menu');
  }

  get f() {
    return this.rfCreate.controls;
  }

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(paramMap => {
      this.tableId = +paramMap.get('id');
    });
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
    this.tongTien = 0;
    this.order1 = {
      service_id: service.id,
      name: service.name,
      quantity: 1,
      price: service.price,
      sum: service.price
    };
    let addNewService = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.order1.service_id === this.orderList[i].service_id) {
        this.orderList[i].quantity += this.order1.quantity;
        console.log(this.orderList[i].quantity);
        this.orderList[i].sum = this.orderList[i].quantity * this.orderList[i].price;
        console.log(this.orderList[i].sum);
        addNewService = false;
      }
    }
    if (addNewService) {
      this.orderList.push(this.order1);
    }
    console.log(this.orderList);
    this.orderList.forEach(item => this.tongTien += (item.quantity * item.price));
  }

  formatter(money) {
    const formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    });
    return formatter.format(money).replace('₫', '');
  }

  tang(orderThem: Order) {
    this.tongTien = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.orderList.length; i++) {
      if (orderThem.service_id === this.orderList[i].service_id) {
        this.orderList[i].quantity += 1;
        this.orderList[i].sum = this.orderList[i].quantity * this.orderList[i].price;
      }
    }
    this.orderList.forEach(item => this.tongTien += (item.quantity * item.price));
    console.log(this.orderList);
  }

  giam(giamOrder: Order) {
    this.tongTien = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.orderList.length; i++) {
      if (giamOrder.service_id === this.orderList[i].service_id) {
        this.orderList[i].quantity -= 1;
        if (this.orderList[i].quantity === 0) {
          this.orderList = this.orderList.filter(item => {
            return item.service_id !== giamOrder.service_id;
          });
        }
        this.orderList[i].sum = this.orderList[i].quantity * this.orderList[i].price;
      }
    }
  }

  delete() {
    this.orderList = this.orderList.filter(item => item.name !== this.deleteOrder.name);
  }

  lay(order: Order) {
    this.deleteOrder = order;
  }

  getBillTable() {
    this.billService.getBill(this.tableId).subscribe(next => {
      if (next === null) {
        this.insertBill = {
          payment_status: 0,
          payment_time: '',
          table_id: this.tableId,
          user_id: 1
        };
        this.billService.insertBill(this.insertBill).subscribe(item => {
          this.getBillTable();
        });
      } else {
        // tslint:disable-next-line:prefer-for-of
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
    if (this.orderList.length === 0) {
      this.toastrService.warning('Vui lòng chọn món');
    } else {
      this.tongTien = 0;
      this.getBillTable();
      this.scoketServiceService.sendMessage('Bàn ' + this.tableId + ' gọi order món');
      this.toastrService.success('Vui lòng đợi trong ít phút');
    }
  }

  goiPhucVu() {
    this.scoketServiceService.sendMessage('Bàn ' + this.tableId + ' gọi phục vụ. ');
    this.toastrService.success('Vui lòng đợi trong ít phút');
    // this.servicesService.getMessage().subscribe(data => {
    //   this.messList = data;
    // });
    // setTimeout(() => {
    //   for (let i = 0; i < this.messList.length; i++) {
    //     this.servicesService.deleteMessage(this.messList[i].id).subscribe();
    //   }
    //   this.messList = [];
    //   this.ngOnInit();
    // }, 30000);
    // this.stompClient = this.scoketServiceService.connect();
    // this.stompClient.connect({}, (frame) => {
    //   console.log(frame);
    //   this.stompClient.subscribe('/topic/list/service', data => {
    //     this.mes = '' + JSON.parse(data.body).text;
    //     // this.toastrService.success(mess);
    //   });
    // });
    // console.log(this.messList);
    // console.log(this.mes);
  }

  tinhTien() {
    this.billService.getBill(this.tableId).subscribe(next => {
      if (next === null) {
        this.toastrService.warning('Không thể tính tiên vì bạn chưa chọn món');
      } else {
        this.scoketServiceService.sendMessage('Bàn ' + this.tableId + ' gọi tính tiền');
        this.toastrService.success('Vui lòng đợi trong ít phút');
      }
    });
  }
}
