import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCreate } from './pedidos-create';

describe('PedidosCreate', () => {
  let component: PedidosCreate;
  let fixture: ComponentFixture<PedidosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
