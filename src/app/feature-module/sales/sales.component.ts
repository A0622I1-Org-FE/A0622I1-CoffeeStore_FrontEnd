import {Component, OnInit} from '@angular/core';
import {TableService} from '../../service/table.service';
import {ITable} from '../../modal/ITable';
import {IBillDetailListDTO} from '../../modal/dto/IBillDetailListDTO';
import {IBillChargingDTO} from '../../modal/dto/IBillChargingDTO';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  tableList: ITable[];
  billDetailList: IBillDetailListDTO[];
  billChargingList: IBillChargingDTO[];

  constructor(private tableService: TableService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.tableService.getAll().subscribe(tableList => this.tableList = tableList);
  }

  disabled() {
    this.toastr.warning('Bàn không có khách!', 'Lưu ý');
  }

  billDetail(tableId: number, tableName: string) {
    this.tableService.getBillDetailByTableId(tableId).subscribe(billDetailList => this.billDetailList = billDetailList);
    this.tableService.getBillChargingByTableId(tableId).subscribe(billChargingList => this.billChargingList = billChargingList);
    document.getElementById('modelTitleId').innerText = 'Hóa đơn bàn ' + tableName;
  }

  /**
   * @description Description: Format giá trị số sang định dạng tiền.
   * @return Giá trị số dưới dạng tiền kèm đơn vị đằng sau.
   */
  formatter(money) {
    return parseFloat(money).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace('₫', 'VNĐ');
  }

  confirmModal() {
    document.getElementById('tableId1').innerText = document.getElementById('tableId').innerText;
  }

  chargeTheBill() {
    this.getAll();
    const tableId = document.getElementById('tableId1').innerText;
    // tableId = String(100);
    console.log(typeof +tableId);
    console.log(this.tableList);
    const isPresent = this.tableList.some(el => el.id === +tableId);
    if (+tableId < 1 || !isPresent) {
      this.toastr.error('Bàn không tồn tại!', 'Lỗi thanh toán');
    } else if (isNaN(+tableId)) {
      this.toastr.error('Sai định dạng số bàn', 'Lỗi thanh toán');
    } else {
      // console.log(typeof tableId);
      this.tableService.tinhTien(tableId, 1).subscribe(billChargingList => this.billChargingList = billChargingList);
      this.toastr.success('Tính tiền thành công!', 'Đã tính tiền');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }
}
