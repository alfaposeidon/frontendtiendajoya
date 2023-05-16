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
    material:["oro"],
    tipo:["anillo"],
    precio:[],
    peso:[],
  });
  productoActualizar:any;


constructor(
  private productoService: ProductoService,
  private fb: FormBuilder 
){ }
  ngOnInit(): void {
    this.getAll();
}

getAll(){
  this.productoService.getAll()
  .subscribe((productos:any) =>{
    console.log('productos', productos)
    this.productos = productos._embedded.productos;
  })
}
save(){
  const values = this.formulario.value;
  console.log('values', values)
  
  this.productoService.create(values)
  .subscribe(()=>{
    this.getAll();
    this.formulario.reset({
    });
}) 
}

update(producto:any){
this.productoActualizar=producto;
this.formulario.setValue({
  nombre: producto.nombre,
  material: producto.material,
  tipo: producto.tipo,
  precio: producto.precio,
  peso: producto.peso,
});
}

delete(producto:any){
  const ok =confirm('¿Esta seguro que desea eliminar el producto ya que no podra recuperarse?');
  if (ok) {
  this.productoService.delete(producto._links.self.href)
  .subscribe(()=>{
     this.getAll();
      }) 
          }
                  }

}