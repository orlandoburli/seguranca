import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComumCadastroComponent } from './area-comum-cadastro.component';

describe('AreaComumCadastroComponent', () => {
  let component: AreaComumCadastroComponent;
  let fixture: ComponentFixture<AreaComumCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaComumCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComumCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
