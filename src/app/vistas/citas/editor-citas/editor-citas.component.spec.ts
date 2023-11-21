import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCitasComponent } from './editor-citas.component';

describe('EditorCitasComponent', () => {
  let component: EditorCitasComponent;
  let fixture: ComponentFixture<EditorCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorCitasComponent]
    });
    fixture = TestBed.createComponent(EditorCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
