import { AlertService } from './../alert.service';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPosition } from 'src/app/modal/IPosition';
import { PositionService } from 'src/app/service/position.service';
import { UserService } from 'src/app/service/user.service';
import { AccountService } from '../../../service/account.service';
import { IAccount } from 'src/app/modal/IAccount';
import { UserEditDTO } from 'src/app/dto/UserEditDTO';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { checkDateOfBirth } from 'src/app/common/validateBirthDay';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  positionList: IPosition[];
  accountList: IAccount[];
  user: UserEditDTO;
  selectedImage: any = null;
  private error: string;
  urlImg: any = null;
  isLoading = false;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private positionService: PositionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    public toastr: ToastrService,
    private renderer: Renderer2,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
    this.titleService.setTitle("Chỉnh Sửa Thông Tin Nhân Viên");
  }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = '/assets/js/index.js';
    this.renderer.appendChild(document.body, script);
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      const id = data.get('id');
      this.userService.findById(parseInt(id)).subscribe(next => {
        this.user = next;
        this.positionService.findAll().subscribe(data => {
          this.positionList = data;
        });
        this.urlImg = this.user.imgUrl;
        this.userForm = this.formBuilder.group({
          id: [this.user.id],
          username: [this.user.username],
          imgUrl: [this.user.imgUrl],
          name: [this.user.name, [Validators.required, Validators.maxLength(40), Validators.minLength(6),
          Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùỳúủýũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪÝẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')]],
          gender: [this.user.gender, [Validators.required]],
          address: [this.user.address, [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ ,]*$')]],
          birthday: [this.user.birthday, [Validators.required, checkDateOfBirth]],
          phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern('^(\\+?84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$')]],
          position: [this.user.position, [Validators.required]],
          salary: [this.user.salary, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
          email: [this.user.email, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
        });
      });
    });
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

  edit() {
    const updatedUser = this.userForm.value;
    const userId = this.user.id;
    if (this.selectedImage) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.isLoading = true;
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.userForm.value.imgUrl = url;
            this.userService.editUser(updatedUser, userId).subscribe(
              (data) => {
                console.log(data);
                if (data != null) {
                  this.error = data[0].defaultMessage;
                  this.toastr.error(this.error, 'Message');
                } else {
                  this.toastr.success('Chỉnh sửa thành công!', 'Message');
                  this.router.navigateByUrl('/edit-user/' + userId);
                }
                this.isLoading = false;
              },
              (error) => {
                console.log(error);
                this.toastr.error('Chỉnh sửa thất bại.', 'Message');
                this.isLoading = false;
              }
            );
          });
        })
      ).subscribe();
    } else {
      this.isLoading = true;
      this.userService.editUser(updatedUser, userId).subscribe(
        (data) => {
          console.log(data);
          if (data != null) {
            this.error = data[0].defaultMessage;
            this.toastr.error(this.error, 'Message');
          } else {
            this.toastr.success('Chỉnh sửa thành công!', 'Message');
            this.router.navigateByUrl('/edit-user/' + userId);
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.toastr.error('Chỉnh sửa thất bại.', 'Message');
          this.isLoading = false;
        }
      );
    }
  }



  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (e: any) => {
      this.urlImg = e.target.result;
    };
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
