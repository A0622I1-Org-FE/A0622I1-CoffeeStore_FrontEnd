/**
 * FeedbackListComponent class to process data with methods called from service and display in html
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */


import {FeedbackService} from '../../../service/feedback.service';
import {FeedbackDetail} from '../../../modal/FeedbackDetail';
import {IFeedbackDto} from '../../../modal/IFeedbackDto';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: IFeedbackDto[];
  feedback: FeedbackDetail;
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 8;
  id: number;
  pages: number[];
  pageRange: number[];
  imgUrl: string[];
  // tslint:disable-next-line:max-line-length
  noImgUrl = ['https://firebasestorage.googleapis.com/v0/b/a0622i1.appspot.com/o/17-06-2023065218PMWhite%20Simple%20Trendy%20Coffee%20Line%20Art%20Logo%20(2).png?alt=media&token=0150e9d2-061d-45fb-a883-97156b904b16'];
  date: string;
  noRecord: boolean;
  listAllFeedback: IFeedbackDto[];
  avgRate: number;

  constructor(private service: FeedbackService) { }

  ngOnInit(): void {
    this.date = '';
    this.service.findAll(this.currentPage, this.pageSize).subscribe(response => {
        this.feedbacks = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
        this.calculateAverageRate();
      },
      error => {
        this.noRecord = error.status === 404;
        this.feedbacks = [];
      });
    if (!this.imgUrl) {
      this.imgUrl = this.noImgUrl;
    }
  }

  calculateAverageRate() {
    this.service.findAll(this.currentPage, this.totalElements).subscribe(response => {
        this.listAllFeedback = response.content;
        let sum = 0;
        for (let i = 0; i < this.listAllFeedback.length; i++) {
          sum += parseInt(this.listAllFeedback[i].rate, 10);
        }
        this.avgRate = Number((sum / this.listAllFeedback.length).toFixed(3));
      },
      error => {
        this.noRecord = error.status === 404;
        this.feedbacks = [];
      });
  }
  formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  searchDate(date: string) {
    this.date = date;
    this.getList();
  }

  getList() {
    if (this.date === '') {
      this.ngOnInit();
    } else {
      this.getListByDate();
    }
  }

  getListByDate() {
    this.currentPage = 0;
    this.service.searchDate(this.date, this.currentPage, this.pageSize).subscribe(response => {
        this.feedbacks = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        this.noRecord = response.size === 0;
        this.countPageCanShow();
      },
      error => {
        this.noRecord = error.status === 404;
        this.feedbacks = [];
      });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getList();
    this.countPageCanShow();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getList();
    }
    this.countPageCanShow();
  }

  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getList();
    }
    this.countPageCanShow();
  }

  sendId(id: number) {
    this.service.findById(id).subscribe(next => {
      this.feedback = next;
    });
    this.service.findImgUrlById(id).subscribe(next => {
      this.imgUrl = next;
      if (this.imgUrl[0] == null) {
        this.imgUrl = this.noImgUrl;
      }
    });
  }
}
