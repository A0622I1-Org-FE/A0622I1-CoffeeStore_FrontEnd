import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {ShowMessage} from '../../../common/show-message';
import {AngularFireStorage} from '@angular/fire/storage';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ServicesService} from '../../../service/services.service';
import {ToastrService} from 'ngx-toastr';
import {ServiceTypeService} from '../../../service/service-type.service';
import {MaterialService} from '../../../service/material.service';
import {RecipeService} from '../../../service/recipe.service';
import {IServiceType} from '../../../modal/IServiceType';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IMaterialDto} from '../../../modal/IMaterialDto';
import {IRecipeDto} from '../../../modal/IRecipeDto';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {IService} from '../../../modal/IService';
import {AlertService} from '../../user/alert.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private showMessage: ShowMessage,
    private titleService: Title,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService,
    private alertService: AlertService,
    private service: ServicesService,
    private serviceTypeService: ServiceTypeService,
    private materialService: MaterialService,
    private recipeService: RecipeService) {
    this.titleService.setTitle('Chỉnh sửa món');
  }

  public serviceTypeList: IServiceType[];
  serviceForm: FormGroup;
  public check = false;
  error: string;
  isLoading = false;
  file: any;
  selectedImage: any = null;
  statusList: string[];
  materials: IMaterialDto[];
  createRecipe: IRecipeDto[] = [];
  recipe: IRecipeDto;
  priceValue = '';
  sumPrice: string;
  showRecipeFl = false;
  editService: IService;
  editImgUrl: string;


  validationMessages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên món.'},
      {type: 'minlength', message: 'Tên phải lớn hơn 6 ký tự.'},
      {type: 'maxlength', message: 'Tên phải bé hơn 50 ký tự.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt.'},
    ],
    imgUrl: [
      {type: 'required', message: 'Hãy chọn ảnh. '},
    ],
    price: [
      {type: 'required', message: 'Vui lòng nhập đơn giá.'},
    ],
    serviceType: [
      {type: 'required', message: 'Hãy chọn loại dịch vụ.'},
    ]
  };

  ngOnInit(): void {
    this.selectedImage = null;
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      const id = data.get('id');
      this.service.findById(parseInt(id)).subscribe(next => {
        this.editService = next;
        console.log(this.editService);
        this.serviceTypeService.findAll().subscribe(data => {
          this.serviceTypeList = data;
        });
        this.editImgUrl = this.editService.imgUrl;
        this.serviceForm = this.formBuilder.group({
          id: [this.editService.id],
          name: [this.editService.name],
          imgUrl: [this.editService.imgUrl],
          price: [this.editService.price],
          typeId: [this.editService.serviceType.id],
          enableFlag: [this.editService.enableFlag],
          createdDate: [this.editService.createdDate],
          describe: [this.editService.describe]
          // id: [this.editService.id],
          // name: [this.editService.name,
          //   Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9]+$')],
          // imgUrl: [this.editService.imgUrl],
          // price: [this.editService.price, [Validators.required, this.checkPrice]],
          // typeId: [this.editService.serviceType.name, [Validators.required]],
          // enableFlag: [this.editService.enableFlag],
          // createdDate: [this.editService.createdDate],
          // describe: [this.editService.describe]
        });
      });
    });
    this.getListServiceType();
    this.statusList = ['Vô hiệu', 'Hoạt động'];
    this.getListMaterial();
  }

  getListServiceType() {
    this.serviceTypeService.findAll().subscribe(response => {
      this.serviceTypeList = response;
    });
  }

  getListMaterial() {
    this.materialService.findAll().subscribe(response => {
      this.materials = response;
    });
  }

  addNewRowRecipe(materialId: string, quantity: string, price: string) {
    this.recipe = {};
    this.recipe = {
      materialId,
      quantity,
      price
    };
    const newRecipe = {
      materialId,
      quantity,
      price
    };
    this.createRecipe.push(newRecipe);
    this.calculationSum();
    this.showRecipeFl = this.createRecipe[1] !== [];
  }

  checkPrice(control: AbstractControl) {
    const priceValue = control.value;
    if (priceValue > 1000000000) {
      return {invalidPriceMax: true};
    }
    if (priceValue < 0) {
      return {invalidPriceMin: true};
    }
    return null;
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  create() {
    if (this.serviceForm.invalid) {
      this.check = true;
      this.showMessage.showMessageCreateError();
      return;
    }
    this.isLoading = true;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.serviceForm.value.imgUrl = url;
          this.service.createService(this.serviceForm.value).subscribe(data => {
            if (data != null) {
              this.error = data[0].defaultMessage;
              this.toastService.error(this.error, 'Message');
            } else {
              this.toastService.success('Thêm thành công!', 'Message');
              this.router.navigateByUrl('listMenu');
              // tslint:disable-next-line:no-shadowed-variable
              this.recipeService.addRecipeForService(this.createRecipe).subscribe(data => {
                this.toastService.error('Không thể thêm công thức', 'Message');
              });
            }
            this.isLoading = false;
          }, error => {
            this.isLoading = false;
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastService.error('Tệp tin không phải là ảnh.', 'Cảnh Báo');
        this.selectedImage = null;
        return;
      }
      if (file instanceof Blob) {
        const fileSizeInMB = file.size / (1024 * 1024);
        const maxFileSizeInMB = 5;
        if (fileSizeInMB > maxFileSizeInMB) {
          this.toastService.error('Giới hạn dung lượng ảnh là 5MB', 'Cảnh Báo');
          this.selectedImage = null;
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = e.target.result;
        };
        this.selectedImage = file;
        reader.readAsDataURL(file);
      } else {
        console.error('Đối tượng nhận được không phải kiểu File hoặc Blob');
        this.selectedImage = null;
      }
    }
  }

  calculationPrice(quantity: string, materialId: string) {
    const price = this.materials.find(material => material.id === parseInt(materialId)).price * parseInt(quantity);
    this.priceValue = parseFloat(String(price)).toFixed(1);
  }

  findMaterialNameOrUnit(materialId: string, type: number) {
    if (type === 1) {
      return this.materials.find(material => material.id === parseInt(materialId)).name;
    } else {
      return this.materials.find(material => material.id === parseInt(materialId)).unit;
    }
  }

  calculationSum() {
    this.sumPrice = '';
    this.sumPrice = this.createRecipe.reduce((total, recipe) => total + parseInt(recipe.price), 0).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).replace('₫', 'VNĐ');
  }

  removeRecipe(recipe: IRecipeDto) {
    this.createRecipe = this.createRecipe.filter(item => item.materialId !== recipe.materialId);
    this.calculationSum();
    this.showRecipeFl = this.createRecipe[1] !== [];
  }
}
