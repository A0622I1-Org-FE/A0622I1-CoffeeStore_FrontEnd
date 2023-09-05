import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../service/services.service';
import {IServiceDto1} from '../../../modal/IServiceDto1';
import {ServiceTypeService} from '../../../service/service-type.service';
import {IServiceType} from '../../../modal/IServiceType';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  serviceList: IServiceDto1[];
  allServices: IServiceDto1[];
  serviceTypeList: IServiceType[];
  statusList: string[];
  quantityASC = true;
  totalPages: number;
  totalElements: number;
  id: number;
  pages: number[];
  pageRange: number[];
  noRecord: boolean;
  index: number;
  tableId: number;
  dateErrorMessage: string;
  firstTimeSearch = false;
  totalPaymentValue: number;
  role: string;

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
  salePrice: string;
  paymentF: string;
  paymentT: string;
  status: string;
  paymentTimeF: string;
  paymentTimeT: string;

  constructor(private servicesService: ServicesService,
              private serviceTypeService: ServiceTypeService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.setDefaultValue();
    this.getListService();
    this.getListServiceType();
    this.checkRole();
  }
  checkRole() {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getRole()[0];
    }
  }

  setDefaultValue() {
    this.serviceName = '';
    this.serviceType = '';
    this.createdDateF = '';
    this.createdDateT = '';
    this.priceF = '';
    this.priceT = '';
    this.salePrice = '';
    this.quantityF = '';
    this.quantityT = '';
    this.paymentF = '';
    this.paymentT = '';
    this.paymentTimeF = '';
    this.paymentTimeT = '';
    this.status = '';
    this.statusList = ['Hoạt động', 'Vô hiệu'];
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
    if (this.serviceName === '' && this.serviceType === '' && this.status === ''
      && this.quantityF === '' && this.quantityT === ''
      && this.priceF === '' && this.priceT === ''
      && this.createdDateF === '' && this.createdDateT === ''
      && this.paymentF === '' && this.paymentT === ''
      && this.paymentTimeF === '' && this.paymentTimeT === '' ) {
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
      this.salePrice, this.quantityF, this.quantityT, this.status, this.paymentF, this.paymentT,
      this.paymentTimeF, this.paymentTimeT).subscribe(response => {
        if (response) {
          this.serviceList = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
          this.noRecord = response.size === 0;
          this.countPageCanShow();
          this.totalPayment();
        } else {
          this.setNoRecord();
        }
      },
      error => {
        this.noRecord = error.status === 404;
        this.serviceList = [];
      });
  }

  getListServiceType() {
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
    this.servicesService.updateFlag(str === 'Vô hiệu', id, this.serviceList.find(service => service.id === id)).subscribe(response => {
      const updatedService = this.serviceList.find(service => service.id === id);
      if (updatedService) {
        if (updatedService.statusFlag === this.statusList[0]) {
          updatedService.statusFlag = this.statusList[1];
        } else {
          updatedService.statusFlag = this.statusList[0];
        }
      }
    });
  }

  search(sName: string, sPriceF: string, sPriceT: string, sType: string, sQuantityF: string, sQuantityT: string,
         sStatus: string, sCreatedDateF: string, sCreatedDateT: string, sPaymentF: string, sPaymentT: string,
         sPaymentTimeF: string, sPaymentTimeT: string) {
    if (Date.parse(sCreatedDateF) > Date.parse(sCreatedDateT)) {
      this.dateErrorMessage += 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc\n';
      this.setNoRecord();
    } else {
      if (this.serviceName !== sName || this.priceF !== sPriceF || this.priceT !== sPriceT ||
        this.quantityF !== sQuantityF || this.quantityT !== sQuantityT || this.status !== sStatus ||
        this.createdDateF !== sCreatedDateF || this.createdDateT !== sCreatedDateT || this.serviceType !== sType ||
        this.paymentTimeF !== sPaymentTimeF || this.paymentTimeT !== sPaymentTimeT) {
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
      this.paymentF = sPaymentF;
      this.paymentT = sPaymentT;
      this.paymentTimeF = this.formatDateInput(sPaymentTimeF);
      this.paymentTimeT = this.formatDateInput(sPaymentTimeT);
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
      const sec = '01';
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
    this.totalPaymentValue = 0;
    this.countPageCanShow();
  }

  reloadPage() {
    window.location.reload();
  }

  totalPayment() {
    this.totalPaymentValue = 0;
    this.servicesService.findAllListService(0, this.totalElements,
      this.serviceName, this.serviceType, this.createdDateF, this.createdDateT, this.priceF, this.priceT,
      this.salePrice, this.quantityF, this.quantityT, this.status, this.paymentF, this.paymentT,
      this.paymentTimeF, this.paymentTimeT).subscribe(response => {
        this.allServices = response.content;
        for (let i = 0; i < this.allServices.length; i++) {
          this.totalPaymentValue += this.allServices[i].payment;
        }
      },
      error => {
        this.setNoRecord();
      });
    if (this.totalPaymentValue === 0) {}
  }
}
