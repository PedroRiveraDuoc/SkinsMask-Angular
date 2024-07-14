import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a nav tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('nav')).toBeTruthy();
  });

  it('should render a ul tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul')).toBeTruthy();
  });

  it('should render a li tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('li')).toBeTruthy();
  });
  
  it('should render a a tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a')).toBeTruthy();
  });

  it('should render a button tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });






});
