import { Component, OnInit } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { ProductService } from '../services/product.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  keyword = 'name';
  autoCompleteData = [];
  isInitBillingProcess: boolean = true;
  initInfo: any = {};
  billingInfo: any = {
    id:0,
    product: '',
    price: '',
    quantity: 1,
    total:0
  };
  billingDataArr: any[] = [];
  submitted: boolean = false;

  billingData:any = {};

  constructor(
    private productService: ProductService,
    private billingService: BillingService) {
   }
  ngOnInit(): void {
    this.productService.GetProducts().subscribe((data: any) =>{
      this.autoCompleteData = data;
    })
  }



  nextToBillingProcess(): void{
    console.log(this.initInfo)

    let saveBillingObj = {
      customerName: this.initInfo.customerName,
      billingInfo: '',
      datetime: Date.now()
    }
    this.billingService.SaveBillingInfo(saveBillingObj).subscribe((data: any) =>{
      this.billingData = data;
      this.isInitBillingProcess = false
    })
  }

  addProductToBilling(form): void{
    this.submitted = true;
    if(!form.valid){
      return;
    }
   
    this.billingInfo.total = this.billingInfo.price * this.billingInfo.quantity;
    this.billingInfo.product = this.billingInfo.product.name;
    this.billingInfo.id=uuidv4();
    let cloneBillingDataArr = JSON.parse(JSON.stringify(this.billingDataArr));
    cloneBillingDataArr.push(this.billingInfo);
    
    // let billingObj = {
    //   customerName: this.billingData.customerName,
    //   billingInfo: JSON.stringify(cloneBillingDataArr)
    // }
    let data = this.returnBillingInfo(cloneBillingDataArr);

    this.billingService.UpdateBillingInfo(data,this.billingData._id).subscribe((data)=>{
      console.log(data);
      this.resetbillingInfoObj();
      this.submitted = false;
      this.getBillingsInfo();
    })

   //this.billingDataArr.push(this.billingInfo);

  }

  returnBillingInfo(billingDataArr: any[]): any{
    let billingObj = {
      customerName: this.billingData.customerName,
      billingInfo: JSON.stringify(billingDataArr)
    }
    return billingObj;
  }

  resetbillingInfoObj (): void{
    this.billingInfo = {
      product: '',
      price: '',
      quantity: 1,
      total:0
    };
    //this.billingData = {};
  }

  getBillingsInfo(): void{
    this.billingDataArr = [];
    this.billingService.GetBillingInfoById(this.billingData._id).subscribe((data)=>{
      this.billingDataArr  = JSON.parse(data.billingValues);
    })
  }

  selectEvent(item) {
    // do something with selected item
    this.billingInfo.price = item.price;
  }

  // onChangeSearch(val: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  // }
  
  // onFocused(e){
  //   // do something when input is focused
  // }

  deleteBillingInfo(event, id): void{
    event.preventDefault();
    event.stopPropagation()
    const index: number = this.billingDataArr.map(function(e) { return e.id; }).indexOf(id);
    if (index !== -1) {
      this.billingDataArr.splice(index, 1);
      let data = this.returnBillingInfo(this.billingDataArr);

      this.billingService.UpdateBillingInfo(data,this.billingData._id).subscribe((data)=>{
        console.log(data);
        this.resetbillingInfoObj();
        this.submitted = false;
        this.getBillingsInfo();
      })
    } 
  }


  calculateTotal(data): any{
    let overallTotal: number = 0;
    for(var i = 0; i < data.length; i++){
      overallTotal += parseInt(data[i].total); 
    } 
    return overallTotal;
  }

}
