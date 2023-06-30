import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPosition } from 'src/app/modal/IPosition';
import { ToastrService } from 'ngx-toastr';
import { ShowMessage } from 'src/app/common/show-message';
import { UserService } from 'src/app/service/user.service';
import { checkDateOfBirth } from 'src/app/common/validateBirthDay';
import { PositionService } from 'src/app/service/position.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public positionList: IPosition[];
  userForm: FormGroup;
  public check = false;
  private error: string;
  selectedImage: any = null;
  isLoading = false;

  constructor(
    private titleService: Title,
    private renderer: Renderer2,
    private router: Router,
    private userService: UserService,
    private positionService: PositionService,
    private toastrService: ToastrService,
    private showMessage: ShowMessage,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.titleService.setTitle("Thêm Mới Nhân Viên");
  }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = '/assets/js/index.js';
    this.renderer.appendChild(document.body, script);
    this.positionService.findAll().subscribe(next => {
      this.positionList = next;
    });
    this.userForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
        imgUrl: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.minLength(6),
        Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùỳýúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÝÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')]),
        gender: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        address: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ ,]*$')]),
        birthday: new FormControl('', [Validators.required, checkDateOfBirth]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(\\+?84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$')]),
        position: new FormControl('', Validators.required),
        salary: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
      }
    )
  }


  validation_messages = {
    userName: [
      { type: 'required', message: 'Vui lòng nhập tên tài khoản.' },
      { type: 'pattern', message: 'Không được nhập ký tự đặt biệt.' }
    ],
    name: [
      { type: 'required', message: 'Vui lòng nhập tên.' },
      { type: 'maxlength', message: 'Tên phải bé hơn 40 ký tự' },
      { type: 'minlength', message: 'Tên phải lớn hơn 6 ký tự.' },
      { type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số.' }
    ],
    birthday: [
      { type: 'required', message: 'Vui lòng nhập ngày sinh. ' },
      { type: 'checkAge', message: 'Tuổi phải từ 18 đến 70.' },
    ],
    phoneNumber: [
      { type: 'required', message: 'Vui lòng nhập số điện thoại.' },
      {
        type: 'pattern',
        message: 'Vui lòng nhập số điện thoại đúng định dạng 09xxxxxxx, 03xxxxxxx, 07xxxxxxx, (84) + 90xxxxxxx.'
      }
    ],
    address: [
      { type: 'required', message: 'Vui lòng nhập địa chỉ.' },
      { type: 'maxlength', message: 'Vui lòng nhập tên > 100.' },
      { type: 'pattern', message: 'Không được nhập ký tự đặt biệt.' }

    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập email.' },
      { type: 'pattern', message: 'Email tuân thủ theo format ex: abc@gmail.com' }
    ],
    gender: [
      { type: 'required', message: 'Vui lòng nhập giới tính.' }
    ],
    position: [
      { type: 'required', message: 'Vui lòng chọn chức vụ.' },
    ],
    salary: [
      { type: 'required', message: 'Vui lòng nhập lương.' },
      { type: 'pattern', message: 'Không được nhập ký tự.' },
    ],
  };


  create() {
    if (this.userForm.invalid) {
      this.check = true;
      this.showMessage.showMessageCreateError();
      return;
    }
    this.isLoading = true;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.userForm.value.imgUrl = url;
          console.log(url);
          this.userService.createUser(this.userForm.value).subscribe(data => {
            console.log(this.userForm.value);
            if (data != null) {
              this.error = data[0].defaultMessage;
              this.toastrService.error(this.error, 'Message');
            } else {
              this.toastrService.success('Thêm thành công!', 'Message');
              this.router.navigateByUrl('create-user');
            }

            this.isLoading = false;
          }, error => {
            console.log(error);
            this.isLoading = false;
          });
        });
      })
    ).subscribe();
  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
