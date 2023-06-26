import {Component, OnInit} from '@angular/core';
import {ServicesService} from '../../../service/services.service';
import {IServices} from '../../../modal/IServices';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  bestSellerList: IServices[] = [];
  newFoodList: IServices[] = [];
  topOneFood: IServices;
  topFourFood: IServices[] = [];

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
      console.log('data: ');
      console.log(data);
      this.bestSellerList = data;
      this.topOneFood = data.shift();
      console.log('topPopularFood: ');
      console.log(this.topOneFood);
      this.topFourFood = this.bestSellerList;
      console.log('fourPopularFood: ');
      console.log(this.topFourFood);
    });
  }
}
