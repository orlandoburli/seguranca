import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComumConsultaComponent } from './area-comum-consulta.component';

describe('AreaComumConsultaComponent', () => {
  let component: AreaComumConsultaComponent;
  let fixture: ComponentFixture<AreaComumConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaComumConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComumConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
