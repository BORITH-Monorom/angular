import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStateSignalApiV19Component } from './manage-state-signal-api-v19.component';

describe('ManageStateSignalApiV19Component', () => {
  let component: ManageStateSignalApiV19Component;
  let fixture: ComponentFixture<ManageStateSignalApiV19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStateSignalApiV19Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStateSignalApiV19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
