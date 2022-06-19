import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotiButtonComponent } from './spoti-button.component';

describe('SpotiButtonComponent', () => {
  let component: SpotiButtonComponent;
  let fixture: ComponentFixture<SpotiButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotiButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
