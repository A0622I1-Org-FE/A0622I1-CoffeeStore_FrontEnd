import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { IBillDetailDto } from 'src/app/modal/IBillDetailDto';
import { IBillDto } from 'src/app/modal/IBillDto';
import { BillService } from 'src/app/service/bill.service';

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
pages: number[];
pageRange: number[];
date: string;
noRecord: boolean;
name: string;
totalPrice: string;

  constructor(private billService:BillService,
              private title:Title) { 
                this.title.setTitle("Quản Lý Hóa Đơn")
              }

  ngOnInit(): void {
    this.name ='';
    this.billService.findAll(this.currentPage, this.pageSize).subscribe(response =>{
      this.billLists = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      this.countPageCanShow();
    },
    error => {
      this.noRecord =error.status ===404;
      this.billLists =[];
    });
  
  }


  formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  searchUser(name: string) {
    this.name = name;
    this.currentPage = 0;
    this.getList();
  }

    getList() {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.getListByUser();
    }
  }

  getListByUser() {
    this.billService.searchUser(this.name, this.currentPage, this.pageSize).subscribe(response => {
        this.billLists = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
        debugger
      },
      error => {
        this.noRecord = error.status === 404;
        this.billLists = [];
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

  sendId(id: number) {
    this.billService.findById(id).subscribe(next => {
      this.billDetail = next;
    });
    
  }

  formatCurrency(currency: string): string {
    return parseFloat(currency).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }
  


}
