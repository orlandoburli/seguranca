import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradorCadastroComponent } from './morador-cadastro.component';

describe('MoradorCadastroComponent', () => {
  let component: MoradorCadastroComponent;
  let fixture: ComponentFixture<MoradorCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoradorCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoradorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
