import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersourceComponent } from './cybersource.component';

describe('CybersourceComponent', () => {
  let component: CybersourceComponent;
  let fixture: ComponentFixture<CybersourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CybersourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CybersourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
