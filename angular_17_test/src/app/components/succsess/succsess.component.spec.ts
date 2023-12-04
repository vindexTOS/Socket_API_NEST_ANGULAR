import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccsessComponent } from './succsess.component';

describe('SuccsessComponent', () => {
  let component: SuccsessComponent;
  let fixture: ComponentFixture<SuccsessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccsessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccsessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
