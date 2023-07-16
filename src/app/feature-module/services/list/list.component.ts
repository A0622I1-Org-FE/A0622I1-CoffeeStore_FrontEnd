import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../service/services.service';
import {IServiceDto1} from '../../../modal/IServiceDto1';
import {ServiceTypeService} from '../../../service/service-type.service';
import {IServiceType} from '../../../modal/IServiceType';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  serviceList: IServiceDto1[];
  serviceTypeList: IServiceType[];
  statusList: string[];
  quantityASC = true;
  totalPages = 0;
  totalElements = 0;
  id: number;
  pages: number[];
  pageRange: number[];
  noRecord: boolean;
  index: number;
  tableId: number;
  dateErrorMessage: string;
  firstTimeSearch = false;

  currentPage = 0;
  pageSize = 8;
  serviceName: string;
  serviceType: string;
  createdDateF: string;
  createdDateT: string;
  priceF: string;
  priceT: string;
  quantityF: string;
  quantityT: string;
  status: string;

  constructor(private servicesService: ServicesService,
              private serviceTypeService: ServiceTypeService) {
  }

  ngOnInit(): void {
    this.serviceName = '';
    this.serviceType = '';
    this.createdDateF = '';
    this.createdDateT = '';
    this.priceF = '';
    this.priceT = '';
    this.quantityF = '';
    this.quantityT = '';
    this.status = '';
    this.statusList = ['Hoạt động', 'Vô hiệu'];
    this.getListService();
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


  getList() {
    if (this.serviceName === '' && this.priceF === '' && this.priceT === ''
      && this.quantityF === '' && this.quantityT === '' && this.status === ''
      && this.createdDateF === '' && this.createdDateT === '') {
      this.firstTimeSearch = true;
      this.ngOnInit();
    } else {
      if (this.firstTimeSearch) {
        this.currentPage = 0;
        this.firstTimeSearch = false;
      }
      this.getListService();
    }
  }

  getListService() {
    this.servicesService.findAllListService(this.currentPage, this.pageSize,
      this.serviceName, this.serviceType, this.createdDateF, this.createdDateT, this.priceF, this.priceT,
      this.quantityF, this.quantityT, this.status).subscribe(response => {
        console.log(response);
        if (response) {
          this.serviceList = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
          this.noRecord = response.size === 0;
          this.countPageCanShow();
        } else {
          this.setNoRecord();
        }
      },
      error => {
        this.noRecord = error.status === 404;
        this.serviceList = [];
      });
    this.serviceTypeService.findAll().subscribe(response => {
      this.serviceTypeList = response;
    });
  }

  formatDate(date: string): string {
    if (date) {
      const parts = date.split('-');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${day}-${month}-${year}`;
    } else {
      return date;
    }
  }

  formatCurrency(currency: number): string {
    return currency.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}).replace('₫', 'VNĐ');
  }

  conventValue(value: number): number {
    if (value == null) {
      return 0;
    } else {
      return value;
    }
  }

  sortQuantity() {
    if (this.quantityASC) {
      this.serviceList.sort((a, b) => a.quantity - b.quantity);
      this.quantityASC = false;
    } else {
      this.serviceList.sort((a, b) => b.quantity - a.quantity);
      this.quantityASC = true;
    }
  }

  changeStatus(str: string, id: number) {
    this.servicesService.updateFlag(str === 'Vô hiệu', id, this.serviceList.find(service => service.id === id));
    this.ngOnInit();
  }

  search(sName: string, sPriceF: string, sPriceT: string, sType: string, sQuantityF: string, sQuantityT: string,
         sStatus: string, sCreatedDateF: string, sCreatedDateT: string) {
    if (Date.parse(sCreatedDateF) > Date.parse(sCreatedDateT)) {
      this.dateErrorMessage += 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc\n';
      this.setNoRecord();
    } else {
      if (this.serviceName !== sName || this.priceF !== sPriceF || this.priceT !== sPriceT ||
        this.quantityF !== sQuantityF || this.quantityT !== sQuantityT || this.status !== sStatus ||
        this.createdDateF !== sCreatedDateF || this.createdDateT !== sCreatedDateT || this.serviceType !== sType) {
        this.currentPage = 0;
        this.firstTimeSearch = false;
      }
      this.dateErrorMessage = '';
      this.createdDateF = this.formatDateInput(sCreatedDateF);
      this.createdDateT = this.formatDateInput(sCreatedDateT);
      this.serviceName = sName;
      this.serviceType = sType;
      this.priceF = sPriceF;
      this.priceT = sPriceT;
      this.quantityF = sQuantityF;
      this.quantityT = sQuantityT;
      this.status = sStatus;
      this.getList();
    }
  }

  formatDateInput(date: string): string {
    if (date) {
      const year = date.substr(0, 4);
      const month = date.substr(5, 2);
      const day = date.substr(8, 2);
      const hour = date.substr(11, 2);
      const min = date.substr(14, 2);
      const sec = '00';
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    } else {
      return date;
    }
  }
  setNoRecord() {
    this.noRecord = true;
    this.serviceList = [];
    this.totalPages = 0;
    this.totalElements = 0;
    this.pages = [];
    this.countPageCanShow();
  }

  resetCondition() {
    this.ngOnInit();
    // document.getElementById('sName').innerText  = '';
    // document.getElementById('sPriceF').innerText = '';
    // document.getElementById('spriceT').innerText = '';
    // document.getElementById('squantityF').innerText = '';
    // document.getElementById('squantityT').innerText = '';
    // document.getElementById('ssStatus').innerText = '';
    // document.getElementById('sCreatedDateF').innerText = '';
    // document.getElementById('sCreatedDateT').innerText = '';
    // document.getElementById('serviceType').innerText = '';
  }
}
