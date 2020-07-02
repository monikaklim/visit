import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompaniesFormPage } from './companies-form.page';

describe('CompaniesFormPage', () => {
  let component: CompaniesFormPage;
  let fixture: ComponentFixture<CompaniesFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
