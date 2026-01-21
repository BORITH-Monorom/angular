import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicReactiveFormComponent } from './basic-reactive-form.component';

describe('BasicReactiveFormComponent', () => {
  let component: BasicReactiveFormComponent;
  let fixture: ComponentFixture<BasicReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicReactiveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
