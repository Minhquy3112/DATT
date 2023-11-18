import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartComponent } from './list-cart.component';

describe('ListCartComponent', () => {
  let component: ListCartComponent;
  let fixture: ComponentFixture<ListCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCartComponent]
    });
    fixture = TestBed.createComponent(ListCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
