import { TestBed } from '@angular/core/testing';
import { CatalogueComponent } from './catalogue.component';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Storage } from '@angular/fire/storage';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: any;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    const storageSpy = jasmine.createSpyObj('Storage', ['get', 'set', 'remove']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Storage, useValue: storageSpy },
        ProductsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productCards = compiled.querySelectorAll('.product-card');
    expect(productCards.length).toBe(component.products.length);
  });

  it('should display product names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productNames = compiled.querySelectorAll('.product-info h3');
    productNames.forEach((productName, index) => {
      expect(productName.textContent).toContain(component.products[index].name);
    });
  });

  it('should display product prices', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productPrices = compiled.querySelectorAll('.product-info p');
    productPrices.forEach((productPrice, index) => {
      expect(productPrice.textContent).toContain(component.products[index].price);
    });
  });


});
