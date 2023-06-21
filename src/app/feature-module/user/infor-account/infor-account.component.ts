import {Component, OnInit} from '@angular/core';
import {IUserInforDTO} from '../../../dto/IUserInforDTO';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-infor-account',
  templateUrl: './infor-account.component.html',
  styleUrls: ['./infor-account.component.css']
})
export class InforAccountComponent implements OnInit {

  userInfor: IUserInforDTO;
  userId;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((dataId: ParamMap) => {
      this.userId = dataId.get('id');
      // tslint:disable-next-line:no-shadowed-variable
      this.userService.findUserInforById(this.userId).subscribe(data => {
        this.userInfor = data;
        console.log(this.userInfor);
      }
    // , error => {
    //     this.toastrService.error('Không tìm thấy thong tin tài khoản!', 'Message');
    //     this.router.navigateByUrl('');
    //     console.log(dataId);
    //   }
      );
    });
  }
}
