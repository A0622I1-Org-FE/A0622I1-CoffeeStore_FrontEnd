import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-verify-change-password',
  templateUrl: './verify-change-password.component.html',
  styleUrls: ['./verify-change-password.component.css']
})
export class VerifyChangePasswordComponent implements OnInit {
  verifyChangePasswordForm: FormGroup;
  isSuccessful = false;
  isSendMail = false;
  code: string;
  validationMessage = {
    newPassword: [
      {type: 'required', message: 'Vui lòng không để trống!'},
      {type: 'pattern', message: 'Tối thiểu 6-15 ký tự bao gồm chữ in hoa và chữ thường không dấu và ký tự đặc biệt!'}
    ],
    repeatPassword: [
      {type: 'required', message: 'Vui lòng không để trống!'},
      {type: 'pattern', message: 'Tối thiểu 6-15 ký tự bao gồm chữ in hoa và chữ thường không dấu và ký tự đặc biệt!'}
    ]
  };
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.verifyChangePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[#$@!%&*?-_])[A-Za-z#$@!%&*?-_]{6,15}$')]],
      repeatPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[#$@!%&*?-_])[A-Za-z#$@!%&*?-_]{6,15}$')]]
    });
    this.activatedRoute.paramMap.subscribe(params => {
        this.code = params.get('code');
        console.log(this.code);
        if (this.code === '') {
          this.isSendMail = false;
        } else {
          this.authService.verifyPassword(this.code).subscribe(
            next => {
              this.toastrService.success('Vui lòng thay đổi mật khẩu mới', 'Xác thực thành công:', {
                timeOut: 5000,
                extendedTimeOut: 1500,
              });
              this.isSendMail = true;
              this.isSuccessful = true;
            },
            err => {
              this.isSendMail = true;
              this.isSuccessful = false;
              this.toastrService.error('Đường dẫn liên kết này có vấn đề!', 'Xác thực thất bại', {
                timeOut: 5000,
                extendedTimeOut: 1500,
              });
            }
          );
        }
      }
    );
  }

  submit() {
    if (this.verifyChangePasswordForm.value.newPassword !== this.verifyChangePasswordForm.value.repeatPassword) {
      this.toastrService.error('Mật khẩu chưa khớp nhau. Vui lòng nhập lại!', 'Cảnh báo:', {
        timeOut: 5000,
        extendedTimeOut: 1500,
      });
    } else if (this.verifyChangePasswordForm.invalid) {
      this.toastrService.error('Mật khẩu chưa đúng định dạng. Vui lòng nhập lại!', 'Cảnh báo:', {
        timeOut: 5000,
        extendedTimeOut: 1500
      });
    } else {
      this.activatedRoute.paramMap.subscribe(param => {
        const code1 = param.get('code');
        console.log(code1);
        this.authService.changePassword(this.verifyChangePasswordForm.value, code1).subscribe(
          data => {
            this.toastrService.success('Bạn hãy đăng nhập lại', 'Thay đổi mật khẩu thành công:', {
              timeOut: 5000,
              extendedTimeOut: 1500
            });
            this.router.navigateByUrl('');
          },
          err => {
            this.router.navigateByUrl(`/verify-change-password/${code1}`);
          }
        );
      });
    }
  }
}
