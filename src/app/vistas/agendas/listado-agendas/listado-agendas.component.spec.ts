import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAgendasComponent } from './listado-agendas.component';

describe('ListadoAgendasComponent', () => {
  let component: ListadoAgendasComponent;
  let fixture: ComponentFixture<ListadoAgendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoAgendasComponent]
    });
    fixture = TestBed.createComponent(ListadoAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
