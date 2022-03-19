import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUnitViewerComponent } from './library-unit-viewer.component';

describe('LibraryUnitViewerComponent', () => {
  let component: LibraryUnitViewerComponent;
  let fixture: ComponentFixture<LibraryUnitViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryUnitViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryUnitViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
