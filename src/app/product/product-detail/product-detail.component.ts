import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/models/product';
import{ GlobalConstants } from '../../common/global-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string = '0';
  pageTile = 'Add Product';
  productForm: FormGroup;
  isSubmitted  =  false;
  isPageAddMode : boolean = true;
  secondaryNamesArr = GlobalConstants.secondayNamesArr
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { 
      if(this.activateRoute.snapshot.params['id']){
        this.productId = this.activateRoute.snapshot.params.id;
        this.pageTile = "Edit Product";
        this.isPageAddMode = false;
      }

  }

  ngOnInit(): void { 
    this.productForm = this.formBuilder.group({
      name:['', Validators.required],
      price:['', Validators.required],
      secondayName: [null, Validators.required]
    })
    if(!this.isPageAddMode){ 
      this.productService.GetProductById(this.productId).subscribe((data: Product) =>{
        this.productForm.patchValue({
          name:data.name,
          price: data.price,
          secondayName: data.secondayName
        })
      })   
    }

  }

  get formControls() { return this.productForm.controls; }

  AddUpdateProduct(){
    console.log(this.productForm.value);
    this.isSubmitted = true;
    if(this.productForm.invalid){
      return;
    } 
    let result = null;
    let successMsg = "";
    if(this.isPageAddMode){
      result = this.productService.SaveProduct(this.productForm.value);
      successMsg = "Product added successfully"
    }
    else{
      result = this.productService.UpdateProduct(this.productForm.value,this.productId);
      successMsg = "Product updated successfully"
    } 
    result.subscribe((data: any) =>{
      this.toastr.success(successMsg);
      this.isSubmitted= false;
      this.productForm.reset();
    })  
  }

}
