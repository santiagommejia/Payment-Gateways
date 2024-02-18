import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhipuComponent } from './khipu.component';

describe('KhipuComponent', () => {
  let component: KhipuComponent;
  let fixture: ComponentFixture<KhipuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhipuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KhipuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
