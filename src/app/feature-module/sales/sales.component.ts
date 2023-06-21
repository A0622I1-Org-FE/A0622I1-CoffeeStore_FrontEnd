import {Component, OnInit} from '@angular/core';
import {TableService} from '../../service/table.service';
import {ITable} from '../../modal/ITable';
import {IBillDetailListDTO} from '../../modal/dto/IBillDetailListDTO';
import {IBillChargingDTO} from '../../modal/dto/IBillChargingDTO';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';


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
              private titleService: Title,
              private router: Router) {
    this.titleService.setTitle('Quản lý bán hàng');
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * <h3>Description: Hiển thị danh sách bàn chưa bị hư</h3>
   * @return Danh sách bàn.
   * @author CuongHM
   */
  getAll() {
    this.tableService.getAll().subscribe(tableList => this.tableList = tableList);
  }

  /**
   * <h3>Description: Hiển thị thông báo bàn không có khách.</h3>
   * @author CuongHM
   */
  disabled() {
    this.toastr.warning('Bàn không có khách!', 'Lưu ý');
  }

  /**
   * <h3>Description: Format giá trị số sang định dạng tiền.</h3>
   * @param tableId tableName
   * @return Giá trị số dưới dạng tiền kèm đơn vị đằng sau.
   * @author CuongHM
   */
  billDetail(tableId: number, tableName: string) {
    this.tableService.getBillDetailByTableId(tableId).subscribe(billDetailList => this.billDetailList = billDetailList);
    this.tableService.getBillChargingByTableId(tableId).subscribe(billChargingList => this.billChargingList = billChargingList);
    document.getElementById('modelTitleId').innerText = 'Hóa đơn bàn ' + tableName;
  }

  /**
   * <h3>Description: Format giá trị số sang định dạng tiền.</h3>
   * <p>Param: money</p>
   * @return Giá trị số dưới dạng tiền kèm đơn vị đằng sau.
   * @author CuongHM
   */
  formatter(money) {
    return parseFloat(money).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
      .replace('₫', 'VNĐ');
  }

  /**
   * <h3>Description: Truyền tableId sang modal confirm.</h3>
   * @author CuongHM
   */
  confirmModal() {
    document.getElementById('tableId1').innerText = document.getElementById('tableId').innerText;
  }

  /**
   * <h3>Description: Tính tiền bàn đã chọn.</h3>
   * @return Hóa đơn đã tính tiền.
   * @author CuongHM
   */
  chargeTheBill() {
    this.getAll();
    const tableId = document.getElementById('tableId1').innerText;
    console.log(typeof +tableId);
    console.log(this.tableList);
    const isPresent = this.tableList.some(el => el.id === +tableId);
    if (+tableId < 1 || !isPresent) {
      this.toastr.error('Bàn không tồn tại!', 'Lỗi thanh toán');
    } else if (isNaN(+tableId)) {
      this.toastr.error('Sai định dạng số bàn', 'Lỗi thanh toán');
    } else {
      this.tableService.tinhTien(tableId, 1).subscribe(billChargingList => this.billChargingList = billChargingList);
      this.toastr.success('Tính tiền thành công!', 'Đã tính tiền');
      setTimeout(() => {
        this.getAll();
      }, 100);
    }
  }
}
