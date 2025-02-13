import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormPageComponent } from './generate-form-page.component';

describe('GenerateFormPageComponent', () => {
  let component: GenerateFormPageComponent;
  let fixture: ComponentFixture<GenerateFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
