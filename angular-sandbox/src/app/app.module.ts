import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { StockHistoryComponent } from './components/stock-history/stock-history.component';
import { StockMarketSelectorComponent } from './components/stock-market-selector/stock-market-selector.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockPriceListComponent } from './components/stock-price-list/stock-price-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    StockHistoryComponent,
    StockMarketSelectorComponent,
    StockListComponent,
    StockPriceListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: StockHistoryComponent, pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
