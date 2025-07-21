import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagoModel } from '../../features/auth/models/pago';
import { PedidoModel } from '../../features/auth/models/pedido';
import { PagoService } from '../services/pago.services';
import { PedidoService } from '../services/pedido.services';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pago.html',
  styleUrls: ['./pago.css']
})
export class PagosComponent {
  private serv = inject(PagoService);
  private pedserv = inject(PedidoService);
  private fb = inject(FormBuilder);

  public pagoForm: FormGroup = this.fb.group({
    id: [null],
    total: [null, [Validators.required, Validators.min(0.01)]],
    metodo_pago: ['', Validators.required],
    fecha_pago: [null, Validators.required],
    pedido: [null, Validators.required]
  });

  private pagosSubject = new BehaviorSubject<PagoModel[]>([]);
  public pago$ = this.pagosSubject.asObservable();
  public pedidos$!: Observable<PedidoModel[]>;

  public modoEdicion = false;
  public idPagoEditar: number | null = null;

  public eliminandoIds = new Set<number>();

  ngOnInit(): void {
    this.cargarPagos();
    this.pedidos$ = this.pedserv.getSelectpedido();
    this.serv.getSelectPago().subscribe(data => this.pagosSubject.next(data));
this.pedidos$ = this.pedserv.getSelectpedido();

  }

  get total() { return this.pagoForm.get('total'); }
  get metodo_pago() { return this.pagoForm.get('metodo_pago'); }
  get fecha_pago() { return this.pagoForm.get('fecha_pago'); }

  private cargarPagos(): void {
    this.serv.getSelectPago().pipe(take(1)).subscribe(data => {
      const ordenados = data.sort((a, b) => a.id! - b.id!);
      this.pagosSubject.next(ordenados);
    });
  }

  registroFn(): void {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    const formValue = this.pagoForm.value;
    const data: PagoModel = {
      ...formValue,
      pedido: typeof formValue.pedido === 'number' 
        ? { id: formValue.pedido } 
        : { id: formValue.pedido.id }
    };

    if (this.modoEdicion && this.idPagoEditar !== null) {
      this.serv.putUpdatePago(this.idPagoEditar, data).subscribe(() => {
        this.cargarPagos();
        this.resetFormulario();
      });
    } else {
      this.serv.postInsertPago(data).subscribe(() => {
        this.cargarPagos();
        this.resetFormulario();
      });
    }
  }

  editarPago(pago: PagoModel): void {
    this.pedidos$.pipe(take(1)).subscribe(pedidos => {
      const pedidoMatch = pedidos.find(p => p.id === pago.pedido.id);

      this.pagoForm.patchValue({
        id: pago.id,
        total: pago.total,
        metodo_pago: pago.metodo_pago,
        fecha_pago: pago.fecha_pago,
        pedido: pedidoMatch ?? null
      });

      this.idPagoEditar = pago.id ?? null;
      this.modoEdicion = true;
    });
  }

  eliminarPago(id: number): void {
  if (this.eliminandoIds.has(id)) return;

  if (confirm('¿Deseas eliminar este pago?')) {
    this.eliminandoIds.add(id);

    this.serv.deleteIdPago(id).subscribe({
      next: () => {
        const actualizados = this.pagosSubject.getValue().filter(p => p.id !== id);
        this.pagosSubject.next(actualizados);

        if (this.idPagoEditar === id) this.resetFormulario();
        this.eliminandoIds.delete(id);
      },
      error: err => {
        console.error('Error al eliminar pago', err);
        this.eliminandoIds.delete(id);
      }
    });
  }
}

  resetFormulario(): void {
    this.pagoForm.reset();
    this.modoEdicion = false;
    this.idPagoEditar = null;
  }

  compararPedidos = (a: PedidoModel, b: PedidoModel): boolean => {
    return a && b ? a.id === b.id : a === b;
  };
}
