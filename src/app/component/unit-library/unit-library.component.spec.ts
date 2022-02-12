import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLibraryComponent } from './unit-library.component';

describe('UnitLibraryComponent', () => {
  let component: UnitLibraryComponent;
  let fixture: ComponentFixture<UnitLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
