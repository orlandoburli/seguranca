import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarEmpresaComponent } from './selecionar-empresa.component';

describe('SelecionarEmpresaComponent', () => {
  let component: SelecionarEmpresaComponent;
  let fixture: ComponentFixture<SelecionarEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecionarEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
