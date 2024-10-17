import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertResultComponent } from './convert-result.component';

describe('ConvertResultComponent', () => {
  let component: ConvertResultComponent;
  let fixture: ComponentFixture<ConvertResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
