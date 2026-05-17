import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    LoaderComponent,
    EmptyStateComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [LoaderComponent,
    EmptyStateComponent, ToastComponent]
})
export class SharedModule { }
