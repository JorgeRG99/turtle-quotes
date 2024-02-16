import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeQuoteComponent } from './type-quote.component';

describe('TypeQuoteComponent', () => {
  let component: TypeQuoteComponent;
  let fixture: ComponentFixture<TypeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeQuoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
