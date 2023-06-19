import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackTypeService} from '../../../service/feedback-type.service';
import {FeedbackService} from '../../../service/feedback.service';
import {Router} from '@angular/router';
import {FeedbackTypeDto} from '../../../../dto/feedback-type-dto';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {FeedbackImageDto} from '../../../../dto/feedback-image-dto';
import {FeedbackImgService} from '../../../service/feedback-img.service';
import {ToastrService} from 'ngx-toastr';

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
    const script = this.renderer.createElement('script');
    script.src = '/assets/js/index.js';
    this.renderer.appendChild(document.body, script);
    this.feedbackTypeService.findAll().subscribe(next => {
      this.feedbackTypeList = next;
      console.log(this.feedbackTypeList);
    });
    this.rfCreate = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      feedbackType: ['', Validators.required],
      content: ['', Validators.required],
      rate: ['']
    });
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
      this.toastr.success('Lời phản hồi của bạn góp phần tạo nên thành công của chúng tôi!' +
        'Chúc bạn một ngày tốt lành ♥♥♥');
      this.router.navigateByUrl('feedback');
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
