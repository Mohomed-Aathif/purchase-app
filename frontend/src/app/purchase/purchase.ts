import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './purchase.html',
  styleUrls: ['./purchase.css']
})
export class PurchaseComponent implements OnInit {

  items = ["Mango","Apple","Banana","Orange","Grapes","Kiwi","Strawberry"];

  batches: any[] = [];

  selectedItem = '';
  selectedBatch = '';
  standardCost = 0;
  standardPrice = 0;
  qty = 0;
  discount = 0;

  totalCost = 0;
  totalSelling = 0;

  tableData: any[] = [];

  totalItems = 0;
  totalQty = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getLocations().subscribe((res: any) => {
      console.log(res);
      this.batches = res;
    });
  }

  calculate() {
    const cost = this.standardCost * this.qty;
    this.totalCost = cost - ((this.discount / 100) * cost);
    this.totalSelling = this.standardPrice * this.qty;
  }

  addItem() {

    this.calculate();

    const item = {
      item: this.selectedItem,
      batch: this.selectedBatch,
      qty: this.qty,
      totalCost: this.totalCost,
      totalSelling: this.totalSelling
    };

    this.tableData.push(item);

    this.calculateSummary();
  }

  calculateSummary() {
    this.totalItems = this.tableData.length;

    this.totalQty = this.tableData.reduce((sum, i) => sum + Number(i.qty), 0);
  }
}