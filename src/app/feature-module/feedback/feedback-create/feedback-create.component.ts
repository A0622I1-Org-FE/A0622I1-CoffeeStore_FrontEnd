import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FeedbackTypeService} from 'src/app/service/feedback-type.service';
import {FeedbackService} from '../../../service/feedback.service';
import {Router} from '@angular/router';
import {FeedbackImgService} from '../../../service/feedback-img.service';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {ServicesService} from '../../../service/services.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FeedbackTypeDto} from '../../../dto/feedback-type-dto';
import {FeedbackImageDto} from '../../../dto/feedback-image-dto';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {

  constructor(private renderer: Renderer2,
              private feedbackTypeService: FeedbackTypeService,
              private feedbackService: FeedbackService,
              private feedbackImageService: FeedbackImgService,
              private fb: FormBuilder,
              private router: Router,
              private serviceService: ServicesService,
              private toastr: ToastrService,
              private elementRef: ElementRef,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  rfCreate: FormGroup;
  feedbackTypeList: FeedbackTypeDto[];
  selectedImage: any = null;
  // tslint:disable-next-line:max-line-length
  defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/a0622i1.appspot.com/o/17-06-2023065218PMWhite%20Simple%20Trendy%20Coffee%20Line%20Art%20Logo%20(2).png?alt=media&token=0150e9d2-061d-45fb-a883-97156b904b16';
  error: string;
  tableId: number;
  function;

  ngOnInit(): void {
    this.tableId = this.serviceService.getIdTable();
    console.log(this.tableId);
    this.loadJavaScriptFile('/assets/js/index.js');
    this.feedbackTypeService.findAll().subscribe(next => {
      this.feedbackTypeList = next;
    });
    this.rfCreate = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, this.noWhitespaceValidator(), Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứửữự ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.minLength(5), Validators.maxLength(50)]],
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'), Validators.email, Validators.minLength(10), Validators.maxLength(254)]],
      feedbackType: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      rate: ['']
    });
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const isWhitespace = control.value.trim().length === 0;
      return isWhitespace ? {whitespace: true} : null;
    };
  }

  loadJavaScriptFile(filePath: string): void {
    const script = this.renderer.createElement('script');
    script.src = filePath;
    this.renderer.appendChild(document.body, script);
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files;
  }

  save() {
    const formData = this.rfCreate.value;
    console.log(formData);
    if (this.selectedImage && this.selectedImage.length > 0) {
      for (let i = 0; i < this.selectedImage.length; i++) {
        const nameImg = this.getCurrentDateTime() + this.selectedImage[i].name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, this.selectedImage[i]).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.callApiAndSaveUrl(url);
            });
          })
        ).subscribe();
      }
    } else {
      this.callApiAndSaveUrl(this.defaultImageUrl);
    }
    if (this.rfCreate.invalid) {
      this.toastr.error('Vui lòng điền tất cả các thông tin cần thiết');
      return;
    } else {
      const email = this.rfCreate.get('email').value;
      console.log(email);
      this.feedbackService.countEmail(email).subscribe(count => {
        if (count > 0) {
          this.toastr.error('Vui lòng điền tất cả các thông tin cần thiết');
          this.error = 'Email này đã có trong hệ thống';
          return;
        } else {
          this.feedbackService.save(formData).subscribe(next => {
            this.toastr.success('Lời phản hồi của bạn góp phần tạo nên thành công của chúng tôi!\n' +
              'Chúc bạn một ngày tốt lành ♥♥♥');
            console.log(this.tableId);
            this.router.navigateByUrl('/service/' + this.tableId);
          });
        }
      });
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  callApiAndSaveUrl(url: string) {
    const feedbackImg: FeedbackImageDto = {
      feedbackId: null,
      imgUrl: url
    };
    this.feedbackImageService.save(feedbackImg).subscribe(() => {
    });
  }

  resetError() {
    this.error = '';
  }

  handleClick() {
    const element = this.elementRef.nativeElement as HTMLElement;
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
