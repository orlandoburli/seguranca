import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradorConsultaComponent } from './morador-consulta.component';

describe('MoradorConsultaComponent', () => {
  let component: MoradorConsultaComponent;
  let fixture: ComponentFixture<MoradorConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoradorConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoradorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
