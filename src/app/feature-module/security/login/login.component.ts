import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AuthService} from '../../../service/auth.service';
import {Title} from '@angular/platform-browser';
import {ShareService} from '../../../service/share.service';
import {Router} from '@angular/router';

class AuthhService {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessage = {
    username: [
      {type: 'required', message: 'Vui lòng không để trống!'}
    ],
    password: [
      {type: 'required', message: 'Vui lòng không để trống!'},
      {type: 'pattern', message: 'Tối thiểu 6-15 ký tự bao gồm chữ in hoa và chữ thường không dấu và ký tự đặc biệt!'}
    ]
  };

  constructor(private toastr: ToastrService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private tokenStrorageService: TokenStorageService,
              private titleService: Title,
              private shareService: ShareService,
              private router: Router) {
    this.titleService.setTitle('Đăng Nhập');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[#$@!%&*?-_])[A-Za-z#$@!%&*?-_]{6,15}$')]],
      remenberMe: ['']
    });
  }

  onSubmit() {
    if ((this.loginForm.value.username + '').trim() === '' || (this.loginForm.value.password + '').trim() === '') {
      this.toastr.error('Thông tin đăng nhập không được để trống.', 'Đăng nhập thất bại', {
        timeOut: 5000,
        extendedTimeOut: 1500
      });
    } else if (this.loginForm.invalid) {
      this.toastr.error('Thông tin đăng nhập chưa đúng định dạng.', 'Đăng nhập thất bại', {
        timeOut: 5000,
        extendedTimeOut: 1500
      });
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          if (this.loginForm.value.remenberMe) {
            this.tokenStrorageService.saveTokenLocal(data.token);
            this.tokenStrorageService.saveNameLocal(data.name);
            this.tokenStrorageService.saveRoleLocal(data.roles);
          } else {
            this.tokenStrorageService.saveTokenSession(data.token);
            this.tokenStrorageService.saveNameSession(data.name);
            this.tokenStrorageService.saveRoleSession(data.roles);
          }
          this.loginForm.reset();
          this.shareService.sendClickEvent();
          this.router.navigateByUrl('/table');
          if (data.changePassword) {
            this.toastr.warning(`Mật khẩu của bạn hiện đã quá 30 ngày. Vui lòng thay đổi mật khẩu mới!`, 'Cảnh báo: ', {
              timeOut: 5000,
              extendedTimeOut: 1500
            });
            this.toastr.success(`Xin chào ${data.name} ^^`, 'Đăng nhập thành công: ', {
              timeOut: 2000,
              extendedTimeOut: 1500
            });
          } else {
            this.toastr.success(`Xin chào ${data.name} ^^`, 'Đăng nhập thành công: ', {
              timeOut: 2000,
              extendedTimeOut: 1500
            });
          }
        },
        error => {
          this.toastr.error('Tên tài khoản hoặc mật khẩu chưa chính xác', 'Đăng nhập thất bại', {
            timeOut: 5000,
            extendedTimeOut: 1500
          });
        }
      );
    }

  }

}
