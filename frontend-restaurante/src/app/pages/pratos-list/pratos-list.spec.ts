import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PratosList } from './pratos-list';

describe('PratosList', () => {
  let component: PratosList;
  let fixture: ComponentFixture<PratosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PratosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PratosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
