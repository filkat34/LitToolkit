import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LexiqueteComponent } from './lexiquete.component';

describe('LexiqueteComponent', () => {
  let component: LexiqueteComponent;
  let fixture: ComponentFixture<LexiqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LexiqueteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LexiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
