import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {FeedbackTypeService} from '../../../service/feedback-type.service';
import {FeedbackService} from '../../../service/feedback.service';
import {FeedbackImgService} from '../../../service/feedback-img.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {FeedbackImageDto} from '../../../dto/feedback-image-dto';
import {FeedbackTypeDto} from '../../../dto/feedback-type-dto';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  rfCreate: FormGroup;
  feedbackTypeList: FeedbackTypeDto[];
  selectedImage: any = null;
  final;
  // tslint:disable-next-line:max-line-length
  defaultImageUrl = 'https://files.slack.com/files-tmb/TEBPXS5HQ-F05BYS4K2RY-abfc0ff965/white_simple_trendy_coffee_line_art_logo__2__480.png';

  // tslint:disable-next-line:max-line-length
  // defaultImageUrl2 = 'https://firebasestorage.googleapis.com/v0/b/a0622i1.appspot.com/o/17-06-2023065218PMWhite%20Simple%20Trendy%20Coffee%20Line%20Art%20Logo%20(2).png?alt=media&token=0150e9d2-061d-45fb-a883-97156b904b16';

  constructor(private renderer: Renderer2,
              private feedbackTypeService: FeedbackTypeService,
              private feedbackService: FeedbackService,
              private feedbackImageService: FeedbackImgService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.loadJavaScriptFile('/assets/js/index.js');
    this.feedbackTypeService.findAll().subscribe(next => {
      this.feedbackTypeList = next;
      console.log(this.feedbackTypeList);
    });
    this.rfCreate = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứửữự ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'), Validators.email]],
      feedbackType: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      rate: ['']
    });
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
    this.feedbackService.save(formData).subscribe(next => {
      this.toastr.success('Lời phản hồi của bạn góp phần tạo nên thành công của chúng tôi!\n' +
        'Chúc bạn một ngày tốt lành ♥♥♥');
      this.router.navigateByUrl('service');
    });

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
}
