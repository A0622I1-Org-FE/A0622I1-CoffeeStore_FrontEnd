import {Component, OnInit} from '@angular/core';
import {TableService} from '../../service/table.service';
import {ITable} from '../../modal/ITable';
import {IBillDetailListDTO} from '../../modal/dto/IBillDetailListDTO';
import {IBillChargingDTO} from '../../modal/dto/IBillChargingDTO';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  tableList: ITable[];
  billDetailList: IBillDetailListDTO[];
  billChargingList: IBillChargingDTO[];

  constructor(private tableService: TableService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.tableService.getAll().subscribe(tableList => this.tableList = tableList);
  }

  disabled() {
    alert('Bàn không có khách!');
  }

  billDetail(tableId: number) {
    this.tableService.getBillDetailByTableId(tableId).subscribe(billDetailList => this.billDetailList = billDetailList);
    this.tableService.getBillChargingByTableId(tableId).subscribe(billChargingList => this.billChargingList = billChargingList);
  }

  formatter(money) {
    const formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    });
    return formatter.format(money).replace('₫', '');
  }

  tinhTien() {
    const tableId = document.getElementById('tableId').innerText;
    console.log(typeof tableId);
    const check = confirm('Bạn có muốn tính tiền bàn này không?');
    if (check) {
      this.tableService.tinhTien(tableId, 1).subscribe(billChargingList => this.billChargingList = billChargingList);
      alert('Tính tiền thành công!');
      window.location.reload();
    }
  }
}
