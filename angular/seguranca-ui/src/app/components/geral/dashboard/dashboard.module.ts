import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../../../plugins/plugins.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PluginsModule,
    DashboardRoutingModule
  ],
  exports : [HomeComponent],
  declarations: [DashboardComponent, HomeComponent]
})
export class DashboardModule { }
