import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/product';
import { ProductService } from '../services/product.service';
import {ProductTypeEnum} from '../enums/product'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  eProduct = ProductTypeEnum;
  productsArr: Product[] = [];
  filterProductArr: Product[];
  searchTxt:any = '';
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private productService: ProductService) {
   }

  ngOnInit(): void {
    this.GetAllProducts();
  }

  GetAllProducts(){
    this.productService.GetProducts().subscribe((data: any) =>{
      this.productsArr = data;
    })
  }

  RedirectToDetail(){
    this.router.navigate(['product-detail'],{relativeTo : this.activatedRoute});
  }

  OnDeleteProduct(event,id): void{
    event.preventDefault();
    event.stopPropagation()
    this.productService.DeleteProduct(id).subscribe((data: any) =>{
      this.GetAllProducts();
    })
  }

  RowClick(id): void{
    this.router.navigate(['product-detail', id],{relativeTo : this.activatedRoute});
  }

  onSearchChange(value: any){
    this.filterProductArr = [];
    let copyProductArr = this.productsArr
      if(value != ""){
        copyProductArr.forEach(element => {
                if(element.name.toUpperCase().indexOf(value.toUpperCase())>=0){
                  this.filterProductArr.push(element);
               }
            });
      }else{
        this.filterProductArr = this.productsArr;
      }

      this.productsArr = this.filterProductArr;
  }
}
