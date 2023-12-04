import {IBillDetailDto} from '../../../modal/IBillDetailDto';
import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {IBillDto} from 'src/app/modal/IBillDto';
import {BillService} from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  billLists: IBillDto[];
  billDetail: IBillDetailDto;
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 8;
  id: number;
  billNo: string;
  createdTimeF: string;
  createdTimeT: string;
  paymentF: string;
  paymentT: string;
  tableNo: string;
  createdBy: string;
  pages: number[];
  pageRange: number[];
  date: string;
  noRecord: boolean;
  name: string;
  totalPaymentInBill: number;
  totalPayment: number;
  nameOrder: string;
  dateErrorMessage: string;
  firstTimeSearch = false;

  constructor(private billService: BillService,
              private title: Title) {
    this.title.setTitle('Quản Lý Hóa Đơn');
  }

  ngOnInit(): void {
    this.setDefaultValue();
    this.name = '';
    // this.billService.findAll(this.currentPage, this.pageSize).subscribe(response => {
    //     this.billLists = response.content;
    //     this.totalPages = response.totalPages;
    //     this.totalElements = response.totalElements;
    //     this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
    //     this.noRecord = response.size === 0;
    //     this.countPageCanShow();
    //   },
    //   error => {
    //     this.noRecord = error.status === 404;
    //     this.billLists = [];
    //   });
    this.getList();
  }

  formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  // searchUser(name: string) {
  //   this.name = name;
  //   this.currentPage = 0;
  //   this.getList();
  // }

  getList() {
    if (this.createdBy === '' && this.billNo === '' && this.createdTimeF === '' && this.createdTimeT === '' &&
      this.paymentF === '' && this.paymentT === '' && this.tableNo === '') {
      this.firstTimeSearch = true;
      this.ngOnInit();
    } else {
      this.getListBill();
    }
  }

  getListBill() {
    this.billService.getBillList(this.currentPage, this.pageSize,
      this.billNo, this.createdTimeF, this.createdTimeT, this.paymentF, this.paymentT, this.tableNo,
      this.createdBy).subscribe(response => {
        if (response) {
          this.billLists = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
          this.noRecord = response.size === 0;
          this.countPageCanShow();
          // this.totalPayment();
        } else {
          this.setNoRecord();
        }
      },
      error => {
        this.noRecord = error.status === 404;
        this.billLists = [];
      });
  }

  // getListByUser() {
  //   this.billService.searchUser(this.name, this.currentPage, this.pageSize).subscribe(response => {
  //       this.billLists = response.content;
  //       this.totalPages = response.totalPages;
  //       this.totalElements = response.totalElements;
  //       this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
  //       this.noRecord = response.size === 0;
  //       this.countPageCanShow();
  //       // debugger
  //     },
  //     error => {
  //       this.noRecord = error.status === 404;
  //       this.billLists = [];
  //     });
  //
  // }

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

  sendId(id: number) {
    this.totalPaymentInBill = 0;
    this.nameOrder = '';
    this.billService.findById(id).subscribe(next => {
      this.billDetail = next;

      // tslint:disable-next-line:forin
      for (const key in this.billDetail) {
        this.totalPaymentInBill += this.billDetail[key].total;
      }
    });
  }

  formatCurrency(currency: number): string {
    return parseFloat(String(currency)).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}).replace('₫', 'VNĐ');
  }

  reloadPage() {
    window.location.reload();
  }

  search(SBillNo: string, sCreatedTimeF: string, sCreatedTimeT: string,
         sPaymentF: string, sPaymentT: string, sTableNo: string, sCreatedBy: string) {
    if (Date.parse(sCreatedTimeF) > Date.parse(sCreatedTimeT)) {
      this.dateErrorMessage += 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc\n';
      this.setNoRecord();
    } else {
      if (this.billNo !== SBillNo || this.createdTimeF !== sCreatedTimeF || this.createdTimeT !== sCreatedTimeT ||
        this.paymentF !== sPaymentF || this.paymentT !== sPaymentT || this.tableNo !== sTableNo || this.createdBy !== sCreatedBy) {
        this.currentPage = 0;
        this.firstTimeSearch = false;
      }
      this.dateErrorMessage = '';
      this.createdTimeF = this.formatDateInput(sCreatedTimeF);
      this.createdTimeT = this.formatDateInput(sCreatedTimeT);
      this.billNo = SBillNo;
      this.paymentF = sPaymentF;
      this.paymentT = sPaymentT;
      this.tableNo = sTableNo;
      this.createdBy = sCreatedBy;
      this.getList();
    }
  }

  setNoRecord() {
    this.noRecord = true;
    this.billLists = [];
    this.totalPages = 0;
    this.totalElements = 0;
    this.pages = [];
    this.totalPayment = 0;
    this.countPageCanShow();
  }

  formatDateInput(date: string): string {
    if (date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      const hour = date.substr(11, 2);
      const min = date.substr(14, 2);
      const sec = '01';
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    } else {
      return date;
    }
  }

  setDefaultValue() {
    this.billNo = '';
    this.createdTimeF = '';
    this.createdTimeT = '';
    this.paymentF = '0';
    this.paymentT = '';
    this.createdBy = '';
    this.tableNo = '';
  }
}
