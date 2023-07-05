import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ITable} from '../../modal/ITable';
import {TableService} from '../../service/table.service';
import {ServicesService} from '../../service/services.service';
import {ScoketServiceService} from '../../service/socket/scoket-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableList: ITable[];

  constructor(private toastr: ToastrService,
              public scoketServiceService: ScoketServiceService,
              private tableService: ServicesService) {
    this.scoketServiceService.connectTable();
  }

  ngOnInit(): void {
    // this.tableService.findAllTable().subscribe(tableList => this.tableList = tableList);
    this.getAll();
  }

  getAll() {
    this.tableService.findAllTable().subscribe(tableList => this.tableList = tableList);
    console.log(this.tableList);
  }
  updateTable(id: number) {
    // this.scoketServiceService.updateTable(id);
    this.tableService.setIdTable(id);
  }
}
