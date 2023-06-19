import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../services/token-storage.service';
import {AuthService} from '../../services/auth.service';

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
              private tokenStrorageService: TokenStorageService) { }

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
      // this.signInForm = new SignInForm(this.loginForm.value.username, this.loginForm.value.password);
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          if (this.loginForm.value.remenberMe) {
            this.tokenStrorageService.saveTokenLocal(data.token);
            this.tokenStrorageService.saveNameLocal(data.name);
            this.tokenStrorageService.saveRoleLocal(data.roles);
            console.log(this.tokenStrorageService.getRole());
          } else {
            this.tokenStrorageService.saveTokenSession(data.token);
            this.tokenStrorageService.saveNameSession(data.name);
            this.tokenStrorageService.saveRoleSession(data.roles);
            console.log(this.tokenStrorageService.getRole());
          }
          this.loginForm.reset();
          this.toastr.success(`Xin chào ${data.name} ^^`, 'Đăng nhập thành công: ', {
            timeOut: 5000,
            extendedTimeOut: 1500
          });
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
