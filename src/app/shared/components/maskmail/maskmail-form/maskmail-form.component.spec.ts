import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskmailComponent } from './maskmail-form.component';

describe('MaskmailComponent', () => {
  let component: MaskmailComponent;
  let fixture: ComponentFixture<MaskmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaskmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
