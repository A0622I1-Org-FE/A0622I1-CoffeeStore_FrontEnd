import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../service/services.service';
import {IServices} from '../../../modal/IServices';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css',
    '../../../../assets/style.css',
    '../../../../assets/css/style.css',
    '../../../../assets/scss/style.scss']
})
export class BodyComponent implements OnInit {
  bestSellerList: IServices[] = [];
  newFoodList: IServices[] = [];


  constructor(private servicesService: ServicesService) {
  }

  ngOnInit(): void {
    this.getNewFoodList();
    this.getTopFivePopular();
  }

  getNewFoodList() {
    this.servicesService.getListNewFood().subscribe(data => {
      this.newFoodList = data;
    });
  }

  getTopFivePopular() {
    this.servicesService.getListBestSeller().subscribe(data => {
      this.bestSellerList = data;
    });
  }
}
