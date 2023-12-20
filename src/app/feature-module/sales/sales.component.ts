import {Component, OnInit} from '@angular/core';
import {TableService} from '../../service/table.service';
import {ITable} from '../../modal/ITable';
import {IBillDetailListDTO} from '../../modal/dto/IBillDetailListDTO';
import {IBillChargingDTO} from '../../modal/dto/IBillChargingDTO';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ServicesService} from '../../service/services.service';
import {Message} from '../../modal/message';
import {Title} from '@angular/platform-browser';
import {BillDetailService} from '../../service/bill-detail.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  tableList: ITable[];
  billDetailList: IBillDetailListDTO[];
  billChargingList: IBillChargingDTO[];
  messList: Message[] = [];
  checkNew1: Message[];
  color = 'white';
  change: string;

  constructor(private tableService: TableService,
              private servicesService: ServicesService,
              private toastr: ToastrService,
              private titleService: Title,
              private router: Router) {
    setInterval(() => {
      this.getAll();
    }, 5000);
    this.titleService.setTitle('Quản lý bán hàng');
  }

  ngOnInit(): void {
    // this.change = this.servicesService.getChange();
    setInterval(() => {
      this.getAll();
      this.getMessage();
      // if (this.servicesService.getChange() === 'true') {
      //   this.ngOnInit();
      // }
    }, 1000);
    setInterval(() => {
      if (this.messList.length > 0) {
        // for (let i = 0; i < this.messList.length ; i++) {
        //   this.servicesService.deleteMessage(this.messList[i].id).subscribe(data => {
        //     console.log(data);
        //   });
        // }
        this.servicesService.deleteMessage(this.messList[this.messList.length - 1].id).subscribe(next => {
          console.log(next);
        });
      }
    }, 30000);
  }

  getAll() {
    this.tableService.getAll().subscribe(tableList => this.tableList = tableList);
  }


  getMessage() {
    this.servicesService.getMessage().subscribe(data => {
      this.checkNew1 = [];
      if (data !== null) {
        this.checkNew(data);
        this.messList = data;
      } else {
        this.messList = data;
      }
    });
  }

  billDetail(tableId, tableName: string) {
    const isPresent = this.tableList.some(el => el.id === +tableId);
    if (+tableId < 1 || isNaN(+tableId)) {
      this.toastr.error('Số bàn không hợp lệ!', 'Lỗi tìm bàn');
    } else if (!isPresent) {
      this.toastr.error('Bàn không tồn tại!', 'Lỗi tìm bàn');
    } else {
      this.tableService.getBillDetailByTableId(tableId).subscribe(billDetailList => this.billDetailList = billDetailList);
      this.tableService.getBillChargingByTableId(tableId).subscribe(billChargingList => this.billChargingList = billChargingList);
      document.getElementById('modelTitleId').innerText = 'Hóa đơn bàn ' + tableName;
      this.getAll();
    }
  }

  formatter(money) {
    return parseFloat(money).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace('₫', 'VNĐ');
  }

  formatter1(quantity, serviceName) {
    if (serviceName.includes('BÁNH')) {
      return quantity + ' cái';
    } else { return quantity + ' ly'; }
  }

  confirmModal() {
    const tableName = document.getElementById('modelTitleId').innerText.replace('Hóa đơn bàn ', '');
    document.getElementById('confirm-body').innerText = 'Bạn có muốn tinh tiền bàn ' + tableName + ' không?';
    document.getElementById('tableId1').innerText = document.getElementById('tableId').innerText;
  }

  chargeTheBill() {
    this.getAll();
    const tableId = document.getElementById('tableId1').innerText;
    const isPresent = this.tableList.some(el => el.id === +tableId);
    if (+tableId < 1 || isNaN(+tableId)) {
      this.toastr.error('Số bàn không hợp lệ!', 'Lỗi tìm bàn');
    } else if (!isPresent) {
      this.toastr.error('Bàn không tồn tại!', 'Lỗi tìm bàn');
    } else {
      this.tableService.tinhTien(tableId).subscribe(billChargingList => this.billChargingList = billChargingList);
      this.toastr.success('Tính tiền thành công!', 'Đã tính tiền');
      setTimeout(() => {
        this.getAll();
      }, 100);
    }
  }

  private checkNew(data: Message[]) {
    this.checkNew1 = data;
    if (this.messList !== null) {
      if (this.checkNew1.length > this.messList.length) {
        this.toastr.success(this.checkNew1[0].message);
        // this.toastr.success('Khách gọi');
      }
    }
  }

  disabled() {
    this.toastr.warning('Bàn không có khách!', 'Lưu ý');
  }
}

