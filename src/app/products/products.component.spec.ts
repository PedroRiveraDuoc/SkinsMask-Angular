import { TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for ProductsComponent
 */
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: any;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProductsComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  /**
   * Test case to verify component creation
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test case to verify product list rendering
   */
  it('should render product list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productCards = compiled.querySelectorAll('.product-card');
    expect(productCards.length).toBe(component.products.length);
  });

  /**
   * Test case to verify product name rendering
   */
  it('should display product names', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productNames = compiled.querySelectorAll('.product-info h3');
    productNames.forEach((productName, index) => {
      expect(productName.textContent).toContain(component.products[index].name);
    });
  });

  /**
   * Test case to verify the add to cart functionality
   */
  it('should call addToCart method when buy button is clicked', () => {
    const addToCartSpy = spyOn(component, 'addToCart').and.callThrough();
    const buttons = fixture.debugElement.queryAll(By.css('.btn-primary'));
    buttons[0].triggerEventHandler('click', null);
    expect(addToCartSpy).toHaveBeenCalledWith(component.products[0]);
  });

  /**
   * Test case to verify the interaction with the CartService
   */
  it('should add product to cart when addToCart is called', () => {
    const product = component.products[0];
    component.addToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledWith(product);
  });
});
