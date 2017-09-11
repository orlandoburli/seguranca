import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilConsultaComponent } from './perfil-consulta.component';

describe('PerfilConsultaComponent', () => {
  let component: PerfilConsultaComponent;
  let fixture: ComponentFixture<PerfilConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
