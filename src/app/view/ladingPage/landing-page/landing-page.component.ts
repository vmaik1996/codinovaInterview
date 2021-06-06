import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../service/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  itemData;
  cartData: any = [];
  total = 0;
  subTotal = 0;
  tax;
  discount;
  percentageAmount = 10;
  totalQuantity = 0;
  openModal = false;

  constructor(
    private service: LandingService
  ) { }

  ngOnInit() {
    this.itemData = this.service.jsonData;
  }
  addToCart(data) {
    let array = {};
    let flag = 0;
    let value = data;
    if(this.cartData.length == 0) {
      array = {
        name: value.name,
        price: value.price,
        quantity: 1,
        total: value.price,
        }
        this.cartData.push(array);
        this.calculate(array,'add');
    } else { 
      this.cartData.forEach( (resp, index) => {
        if(resp.name == value.name) {
          flag++;
          resp.quantity +=  1;
          resp.total = parseFloat(resp.price) + parseFloat(resp.total) + '';
          this.calculate(resp,'add');
        }
        if(index+1 == this.cartData.length) {
          if(flag == 0) {
            array = {
              name: value.name,
              price: value.price,
              quantity: 1,
              total: value.price,
              }
              this.calculate(array,'add');
              this.cartData.push(array); 
          }
        }
      });
    }
  }
  decreaseCart(data, index) {
    if (data.quantity > 1) {
      this.calculate(this.cartData[index],'sub'); 
      this.cartData[index].quantity -=  1;
      this.cartData[index].total = parseFloat(this.cartData[index].total)  - parseFloat(this.cartData[index].price) + '';
    } else {
      this.calculate(this.cartData[index],'sub');
      this.cartData.splice(index, 1);
    }
  }
  increaseCart(data, index) {
    this.cartData[index].quantity +=  1;
    this.cartData[index].total = parseFloat(this.cartData[index].total) +  parseFloat(this.cartData[index].price) + '';
    this.calculate(this.cartData[index],'add');
  }
  deleteCartValue(data, index) {
    this.totalQuantity -=   this.cartData[index].quantity;
    this.subTotal -= parseFloat(this.cartData[index].total); 
     this.finalResult();
    this.cartData.splice(index, 1); 
  }
  emptyCart() {
    this.cartData = [];
    this.total = 0;
    this.subTotal = 0;
    this.tax = 0;
    this.discount = 0;
    this.totalQuantity = 0; 
  }
  calculate(value, action = 'add') {
    if( action == 'add') {
      this.totalQuantity +=  1;
      this.subTotal += parseFloat(value.price);
    } else if(action = 'sub'){
      this.totalQuantity -= 1;
      this.subTotal -= parseFloat(value.price);
    }
    this.finalResult();
  }
  finalResult() {
    this.tax = this.percentage(this.percentageAmount);
    this.discount = this.percentage(this.percentageAmount);
    this.total = this.subTotal + this.tax - this.discount;
  }
  percentage(percentValue) {
    return (this.subTotal / 100) * percentValue;
  }
  process() {
    this.openModal = false;
    setTimeout( ()=> {
      this.service.data = {
        addedProduct: this.cartData,
        total: this.total,
        subTotal: this.subTotal,
        tax: this.tax,
        discount: this.discount,
        totalQuantity: this.totalQuantity,
        percentageAmount: this.percentageAmount
      }
      this.openModal = true;
      this.service.view = this.openModal;
    }, 500);
  }

}
