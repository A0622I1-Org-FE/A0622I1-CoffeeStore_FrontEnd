import {Component, OnInit} from '@angular/core';
import {IUserInforDTO} from '../../../dto/IUserInforDTO';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-infor-account',
  templateUrl: './infor-account.component.html',
  styleUrls: ['./infor-account.component.css']
})
export class InforAccountComponent implements OnInit {

  userInfor: IUserInforDTO;
  isLoad: boolean;
  notFound: boolean;
  userId;
  role: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private toastrService: ToastrService,
              private tokenStorageService: TokenStorageService,
              private titleService: Title) {
    this.titleService.setTitle('Thông tin tài khoản cá nhân');
  }

  ngOnInit(): void {
    this.loadRole();
    this.isLoad = true;
    this.userService.findUserInforByToken().subscribe(data => {
        this.userInfor = data;
        this.isLoad = false;
        if (data == null) {
          this.isLoad = false;
          this.notFound = true;
          this.toastrService.error('Không tìm thấy thông tin hoặc người dùng đã xoá khỏi hệ thống!', 'Thông báo');
          this.router.navigateByUrl('');
        }
      }, error => {
        this.toastrService.error('Không tìm thấy thông tin hoặc người dùng đã xoá khỏi hệ thống!', 'Thông báo');
        this.router.navigateByUrl('');
      }
    );

  }

  loadRole() {
    this.role = this.tokenStorageService.getRole()[0];
  }

  formatSalary(salary: number): string {
    // tslint:disable-next-line:variable-name
    const string = salary + '';
    return parseFloat(string).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  }

  formatPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
      return '' + match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return null;
  }
}
