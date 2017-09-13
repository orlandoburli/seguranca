import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoConsultaComponent } from './veiculo-consulta.component';

describe('VeiculoConsultaComponent', () => {
  let component: VeiculoConsultaComponent;
  let fixture: ComponentFixture<VeiculoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
