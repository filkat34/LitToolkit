import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisicalcComponent } from './lisicalc.component';

describe('LisicalcComponent', () => {
  let component: LisicalcComponent;
  let fixture: ComponentFixture<LisicalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LisicalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisicalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
