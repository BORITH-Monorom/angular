import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskmailPreviewComponent } from './maskmail-preview.component';

describe('MaskmailPreviewComponent', () => {
  let component: MaskmailPreviewComponent;
  let fixture: ComponentFixture<MaskmailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaskmailPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskmailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
