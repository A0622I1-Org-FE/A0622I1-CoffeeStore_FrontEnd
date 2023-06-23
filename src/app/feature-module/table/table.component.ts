import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ITable} from '../../modal/ITable';
import {TableService} from '../../service/table.service';
import {ServicesService} from '../../service/services.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableList: ITable[];

  constructor(private toastr: ToastrService,
              private tableService: ServicesService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.tableService.findAllTable().subscribe(tableList => this.tableList = tableList);
    console.log(this.tableList);
  }
  disabled() {
    // alert('Bàn không có khách!');
    this.toastr.warning('Bàn này đã có khách!', 'Lưu ý');
  }

  updateTable() {
  }
}
