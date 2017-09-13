import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberacaoAcessoComponent } from './liberacao-acesso.component';

describe('LiberacaoAcessoComponent', () => {
  let component: LiberacaoAcessoComponent;
  let fixture: ComponentFixture<LiberacaoAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberacaoAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberacaoAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
