import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundSelectorComponent } from './components/fund-selector/fund-selector.component';

const routes: Routes = [
  { path: '/fund-selector', component: FundSelectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
