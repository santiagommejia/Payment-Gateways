import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibelulaComponent } from './libelula.component';

describe('LibelulaComponent', () => {
  let component: LibelulaComponent;
  let fixture: ComponentFixture<LibelulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibelulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibelulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
