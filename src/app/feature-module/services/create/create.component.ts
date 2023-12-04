import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IServiceType} from '../../../modal/IServiceType';
import {ShowMessage} from '../../../common/show-message';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ServicesService} from '../../../service/services.service';
import {ServiceTypeService} from '../../../service/service-type.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private showMessage: ShowMessage,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private titleService: Title,
              private renderer: Renderer2,
              private router: Router,
              private service: ServicesService,
              private toastService: ToastrService,
              private serviceTypeService: ServiceTypeService) {
    this.titleService.setTitle('Đăng ký menu');
  }

  public serviceTypeList: IServiceType[];
  serviceForm: FormGroup;
  public check = false;
  error: string;
  isLoading = false;
  file: any;
  selectedImage: any = null;
  statusList: string[];


  validationMessages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên món.'},
      {type: 'minlength', message: 'Tên phải lớn hơn 6 ký tự.'},
      {type: 'maxlength', message: 'Tên phải bé hơn 50 ký tự.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt.'},
    ],
    imgUrl: [
      {type: 'required', message: 'Hãy chọn ảnh. '},
    ],
    price: [
      {type: 'required', message: 'Vui lòng nhập đơn giá.'},
    ],
    serviceType: [
      {type: 'required', message: 'Hãy chọn loại dịch vụ.'},
    ]
  };

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [
        Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')]),
      imgUrl: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, this.checkPrice]),
      typeId: new FormControl(1, [Validators.required]),
      enableFlag: new FormControl(1),
      createdDate: new FormControl(this.getCurrentDateTime()),
      // discription: new FormControl('', [Validators.required])
    });
    this.getListServiceType();
    this.statusList = ['Vô hiệu', 'Hoạt động'];
  }

  getListServiceType() {
    this.serviceTypeService.findAll().subscribe(response => {
      this.serviceTypeList = response;
    });
  }

  checkPrice(control: AbstractControl) {
    const priceValue = control.value;
    if (priceValue > 1000000000) {
      return {invalidPriceMax: true};
    }
    if (priceValue < 0) {
      return {invalidPriceMin: true};
    }
    return null;
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  create() {
    if (this.serviceForm.invalid) {
      this.check = true;
      this.showMessage.showMessageCreateError();
      return;
    }
    console.log(this.serviceForm.value);
    this.isLoading = true;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.serviceForm.value.imgUrl = url;
          this.service.createService(this.serviceForm.value).subscribe(data => {
            console.log(this.serviceForm.value);
            if (data != null) {
              this.error = data[0].defaultMessage;
              this.toastService.error(this.error, 'Message');
            } else {
              this.toastService.success('Thêm thành công!', 'Message');
              this.router.navigateByUrl('listMenu');
            }

            this.isLoading = false;
          }, error => {
            this.isLoading = false;
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage != null) {
      const fileSizeInMB = this.selectedImage.size / (1024 * 1024);
      const maxFileSizeInMB = 5;
      if (fileSizeInMB > maxFileSizeInMB) {
        this.toastService.error('Giới hạn dung lượng ảnh là 5MB', 'Cảnh Báo');
        this.selectedImage = null;
        return;
      }
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = this.selectedImage.name.toLowerCase().substring(this.selectedImage.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastService.error('Tệp tin không phải là ảnh.', 'Cảnh Báo');
        this.selectedImage = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
    }
  }
}
