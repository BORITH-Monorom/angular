import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskmailTableComponent } from './maskmail-table.component';

describe('MaskmailTableComponent', () => {
  let component: MaskmailTableComponent;
  let fixture: ComponentFixture<MaskmailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaskmailTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskmailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
