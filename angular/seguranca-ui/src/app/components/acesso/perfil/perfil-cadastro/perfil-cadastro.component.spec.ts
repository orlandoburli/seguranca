import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCadastroComponent } from './perfil-cadastro.component';

describe('PerfilCadastroComponent', () => {
  let component: PerfilCadastroComponent;
  let fixture: ComponentFixture<PerfilCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
