import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import {ToastrModule} from 'ngx-toastr';
import { BodyComponent } from './body/body.component';


@NgModule({
    declarations: [BodyComponent],
    exports: [
        BodyComponent
    ],
    imports: [
        CommonModule,
        ServicesRoutingModule,
        ToastrModule.forRoot()
    ]
})
export class ServicesModule { }
