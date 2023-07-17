import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
    '../../../assets/style.css',
    '../../../assets/css/style.css',
    '../../../assets/scss/style.scss']
})
export class FooterComponent implements OnInit {
  located: string;
  constructor() { }

  ngOnInit(): void {
    this.located = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3814.130728898992!2d107.010565!3d17.066256999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAzJzU4LjUiTiAxMDfCsDAwJzM4LjAiRQ!5e0!3m2!1svi!2s!4v1689604721475!5m2!1svi!2s';
  }

}
