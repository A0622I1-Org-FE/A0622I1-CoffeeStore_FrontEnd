import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IPasswordChangeDTO} from '../../../dto/IPasswordChangeDTO';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../service/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  passwordDTO: IPasswordChangeDTO;

  constructor(private router: Router,
              private toastr: ToastrService,
              private accountService: AccountService) {
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
      {type: 'required', message: 'Xác nhận lại mật khẩu.'},
    ]
  };

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
        currentPassword: new FormControl('', [Validators.required, this.checkLengthPass]),
        newPassword: new FormControl('', [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&-_])[A-Za-z@$!%*?&-_]{6,15}$')]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, [this.checkMatch('newPassword', 'confirmPassword')]
    );
  }

  checkMatch(newPassword: string, confirmPassword: string) {
    return (form: AbstractControl) => {
      const passwordValue = form.get(newPassword)?.value;
      const confirmPasswordValue = form.get(confirmPassword)?.value;

      if (passwordValue !== confirmPasswordValue && confirmPasswordValue.length > 0) {
        return {passwordNotMatch: true};
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
    console.log(this.passwordChangeForm.value);
    if (this.passwordChangeForm.invalid) {
      this.toastr.error('Các trường điển chưa hợp lệ');
      return;
    } else {
      console.log(this.passwordChangeForm.value);
      this.accountService.changePassword(this.passwordChangeForm.value).subscribe(data => {
        this.toastr.success();
        this.router.navigateByUrl('Đổi mật khẩu thất bại');
      }, error => {
        this.toastr.error('Đổi mật khẩu thất bại');
      });
    }
  }
}
