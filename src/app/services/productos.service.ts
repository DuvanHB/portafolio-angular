import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get<Producto[]>('https://angular-template-html-67734-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
        this.cargando = false;
        this.productos = resp;
        resolve(this.productos);
      });
    });
  }

  getProducto(id: string) {
    return this.http.get<ProductoDescripcion>(`https://angular-template-html-67734-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string) {
    if(this.productos.length === 0){
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino : string) {
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(producto => {
      const tituloLower = producto.titulo.toLocaleLowerCase();
      if (producto.categoria.indexOf(termino) >= 0
      || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push(producto);
      }
    });
  }
}
