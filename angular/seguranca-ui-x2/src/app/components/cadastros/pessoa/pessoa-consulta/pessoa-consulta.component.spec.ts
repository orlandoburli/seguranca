import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaConsultaComponent } from './pessoa-consulta.component';

describe('PessoaConsultaComponent', () => {
  let component: PessoaConsultaComponent;
  let fixture: ComponentFixture<PessoaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
