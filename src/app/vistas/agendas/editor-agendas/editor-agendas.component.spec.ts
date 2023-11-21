import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorAgendasComponent } from './editor-agendas.component';

describe('EditorAgendasComponent', () => {
  let component: EditorAgendasComponent;
  let fixture: ComponentFixture<EditorAgendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorAgendasComponent]
    });
    fixture = TestBed.createComponent(EditorAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
