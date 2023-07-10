import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IPasswordChangeDTO} from '../../../dto/IPasswordChangeDTO';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Title} from '@angular/platform-browser';
import {HeaderComponent} from '../../../shared-module/header/header.component';
import {LoginStatusService} from '../../../service/login-status.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  username: string;

  constructor(private router: Router,
              private toastr: ToastrService,
              private accountService: AccountService,
              private loginStatus: LoginStatusService,
              private tokenStorageService: TokenStorageService,
              private titleService: Title) {
    this.titleService.setTitle('Đổi mật khẩu');
  }

  validationMessages = {
    currentPassword: [
      {type: 'required', message: 'Mật khẩu hiện tại không được trống.'},
      {type: 'minLength', message: 'Mật khẩu phải từ 6 - 15 ký tự.'},
    ],
    newPassword: [
      {type: 'required', message: 'Mật khẩu mới không được để trống.'},
      {type: 'pattern', message: 'Từ 6-15 ký tự, gồm chữ thường, chữ hoa, ký tự đặc biệt.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Nhập lại mật khẩu mới.'},
    ]
  };

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
        currentPassword: new FormControl('', [Validators.required, this.checkLengthPass]),
        newPassword: new FormControl('', [Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[#$@!%&*?-_])[A-Za-z#$@!%&*?-_]{6,15}$')]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, [this.checkConfirmPassword('newPassword', 'confirmPassword'),
        this.checkMatchNewPassword('currentPassword', 'newPassword')]
    );
  }

  checkConfirmPassword(newPassword: string, confirmPassword: string) {
    return (form: AbstractControl) => {
      const passwordValue = form.get(newPassword)?.value;
      const confirmPasswordValue = form.get(confirmPassword)?.value;

      if (passwordValue !== confirmPasswordValue && confirmPasswordValue.length > 0) {
        return {passwordNotMatch: true};
      }
      return null;
    };
  }

  checkMatchNewPassword(currentPassword: string, newPassword: string) {
    return (form: AbstractControl) => {
      const currentPasswordValue = form.get(currentPassword)?.value;
      const newPasswordValue = form.get(newPassword)?.value;
      if (currentPasswordValue.length > 0 && newPasswordValue.length > 0) {
        if (currentPasswordValue === newPasswordValue) {
          return {newPasswordMatch: true};
        }
      }
      return null;
    };
  }

  checkLengthPass(control: AbstractControl) {
    const currentPass = control.value;
    if (currentPass.length !== 0) {
      if (currentPass.length < 6 || currentPass.length > 15) {
        return {invalidLength: true};
      }
      return null;
    }
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    const iCurrentPassword = document.getElementById('iCurrentPassword');
    if (iCurrentPassword.className === 'fas fa-eye') {
      iCurrentPassword.classList.remove('fa-eye');
      iCurrentPassword.classList.add('fa-eye-slash');
    } else {
      iCurrentPassword.classList.remove('fa-eye-slash');
      iCurrentPassword.classList.add('fa-eye');
    }
  }

  showNewPassword(newPassword: any) {
    newPassword.type = newPassword.type === 'password' ? 'text' : 'password';
    const iNewPassword = document.getElementById('iNewPassword');
    if (iNewPassword.className === 'fas fa-eye') {
      iNewPassword.classList.remove('fa-eye');
      iNewPassword.classList.add('fa-eye-slash');
    } else {
      iNewPassword.classList.remove('fa-eye-slash');
      iNewPassword.classList.add('fa-eye');
    }
  }

  showConfirmPassword(confirmPassword: any) {
    confirmPassword.type = confirmPassword.type === 'password' ? 'text' : 'password';
    const iConfirmPassword = document.getElementById('iConfirmPassword');
    if (iConfirmPassword.className === 'fas fa-eye') {
      iConfirmPassword.classList.remove('fa-eye');
      iConfirmPassword.classList.add('fa-eye-slash');
    } else {
      iConfirmPassword.classList.remove('fa-eye-slash');
      iConfirmPassword.classList.add('fa-eye');
    }
  }

  changPassword() {
    if (this.passwordChangeForm.invalid) {
      this.toastr.warning('Các trường điển chưa hợp lệ', 'Thông báo');
      return;
    } else {
      this.accountService.changePasswordRequest(this.passwordChangeForm.value).subscribe(data => {
        this.toastr.warning('Vui lòng đăng nhập lại !', 'Thông báo', {
          timeOut: 5000,
          extendedTimeOut: 1500
        });
        this.toastr.success('Đổi mật khẩu thành công', 'Thông báo', {
          timeOut: 3000,
          extendedTimeOut: 1500
        });
        this.tokenStorageService.signOut();
        this.loginStatus.changeStatus(false);
        this.router.navigateByUrl('/login');
      }, error => {
        this.toastr.error('Mật khẩu hiện tại không chính xác', 'Thông báo');
      });
    }
  }
}
