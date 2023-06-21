import {Component, OnInit} from '@angular/core';
import {IUserDto} from '../../../modal/IUserDto';
import {UserService} from '../../../service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: IUserDto[];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 8;
  id: number;
  pages: number[];
  pageRange: number[];
  date: string;
  name: string;
  noRecord: boolean;

  constructor(private service: UserService, private message: ToastrService) {
  }

  ngOnInit(): void {
    this.date = '';
    this.name = '';
    this.service.findAll(this.currentPage, this.pageSize).subscribe(response => {
        this.users = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
      },
      error => {
        this.noRecord = error.status === 404;
        this.users = [];
      });
  }

  getList() {
    if (this.date === '' && this.name === '') {
      this.ngOnInit();
    } else {
      this.getListByDateOrName();
    }
  }

  sendDateName(date: string, name: string) {
    this.date = date;
    this.name = name;
    this.getListByDateOrName();
  }

  getListByDateOrName() {
    this.currentPage = 0;
    this.service.searchDateOrName(this.date, this.currentPage, this.pageSize, this.name).subscribe(response => {
        this.users = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
      },
      error => {
        this.noRecord = error.status === 404;
        this.users = [];
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

  formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  formatGender(gender: string): string {
    if (gender === '1') {
      return 'Nam';
    } else if (gender === '0') {
      return 'Nữ';
    } else {
      return 'Khác';
    }
  }

  getEnableFlag(enableFlag: string): boolean {
    return enableFlag !== 'false';
  }

  formatSalary(salary: string): string {
    return parseFloat(salary).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }

  sendId(id: number) {
    this.id = id;
  }

  deleteById() {
    this.service.deleteById(this.id).subscribe(
      response => {
        this.ngOnInit();
      },
      error => {
        this.ngOnInit();
        this.message.success('Đã xóa thành công', 'Thông báo xóa');
      }
    );
  }
}
