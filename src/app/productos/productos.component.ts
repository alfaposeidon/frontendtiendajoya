  import { Component, OnInit } from '@angular/core';
  import { ProductoService } from '../producto.service';
  import { FormBuilder,FormGroup } from '@angular/forms';

  @Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
  })
  export class ProductosComponent implements OnInit{
    productos: any[] = [];
    formulario: FormGroup =this.fb.group({
      nombre:[],
      material:[],
      tipo:[],
      precio:[],
      peso:[],
    });
    producto: any;
    productoActualizar:any;

    materiales: string[] = ['oro', 'plata'];
    tipos: string[] = ['anillo', 'cadena', 'reloj'];



  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder 
  ){ }
    ngOnInit(): void {
      this.getAll();
  }
  /*sortProductos() {
    this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  */
  sortProductos() {
    this.productos.sort((a, b) => (a.nombre?.localeCompare(b.nombre)) || 0);
  }
  getAll(){
    this.productoService.getAll()
    .subscribe((productos:any) =>{
      console.log('productos', productos)
      this.productos = productos._embedded.productos;
      this.sortProductos();
    })
  }
  save() {
    const values = this.formulario.value;
  
    if (this.producto) {
      // Modo de actualización
   //   this.productoService.update(this.producto._links.self.href, values)
      this.productoService.edit(this.producto._links.self.href, values)
        .subscribe(() => {
          this.getAll();
          this.formulario.reset();
          this.producto = null; // Reiniciar el producto seleccionado
        });
    } else {
      // Modo de creación
      this.productoService.create(values)
        .subscribe(() => {
          this.getAll();
          this.formulario.reset();
        });
    }
  }

  update(producto:any){
  this.producto = producto;
  this.productoActualizar=producto;
  this.formulario.patchValue({
    nombre: producto.nombre,
    material: producto.material,
    tipo: producto.tipo,
    precio: producto.precio,
    peso: producto.peso,
  });
  }

//  editable = false;

  edit(producto: any) {
    this.producto = producto;
    this.productoActualizar = producto;
    this.formulario.setValue({
      nombre: producto.nombre,
      material: producto.material,
      tipo: producto.tipo,
      precio: producto.precio,
      peso: producto.peso,
    });
  //  this.editable = true;
  }


  delete(producto:any){
    const ok =confirm('¿Esta seguro que desea eliminar el producto?, ya que no podra recuperarse');
    if (ok) {
    this.productoService.delete(producto._links.self.href)
    .subscribe(()=>{
      this.getAll();
        }) 
            }
                    }

  }