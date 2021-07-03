<template>
    <div>
        <navegacion/>
         <v-card class="mx-auto" max-width="800"> 
    
              <!--  <v-btn  @click="agregarproducto" color="pink"  fab  dark  small  absolute   bottom    right  >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>-->
               

    </v-card>
    <!--<v-row><v-btn @click="vercarrito"><v-icon>mdi-cart-outline</v-icon>ver carrito</v-btn></v-row>
       --> <div>
         
   <v-simple-table>
    <template v-slot:default>
      <thead>
          <tr>
          <th class="text-left">   nombre </th>
          <th class="text-left">   unidad </th>
          
           <th class="text-left">   precio </th>
          <th class="text-left">   categoria </th>
          
          </tr>
      </thead>
      <tbody>
        <tr    v-for="item in productos"   :key="item.id"
        >
        
          <td>{{ item.nombre }}</td>
           <td>{{ item.unidad }}</td>
         
        
        <td>{{ item.presio }}</td>
        <td>{{ item.categoria }}</td>
        
        <v-btn text @click="fn_sumar(item.id,item.nombre,item.unidad,item.presio,item.categoria)"> <v-icon>mdi-cart-outline</v-icon></v-btn> 
       
        </tr>
      </tbody>

    </template>
  </v-simple-table>

        </div>
        <!---->
        <v-row justify="center">
       <v-dialog
      v-model="dialog"
      persistent
      max-width="mx-class"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
         ver carrito {{contcarrito}}
        </v-btn>
        
       
      </template>
      <v-card lass="mx-auto" max-width="800" >
        <v-card-title class="headline">
          Carrito
        </v-card-title>
      
        <v-card-actions>
        <v-row>  <v-simple-table>
               
    <template v-slot:default>
      <thead>
          <tr>
          <th class="text-left">   nombre </th>
          <!--<th class="text-left">   unidad </th>
          -->
           <th class="text-left">   precio </th>
          <!--<th class="text-left">   categoria </th>
          -->
          <th class="text-left">   cantidad </th>
          </tr>
      </thead>
      <tbody>
        <tr    v-for="(item,index) in micarrito"   :key="item.id"
        >
          <td>{{ item.nombre }}</td>
           <!--<td>{{ item.unidad }}</td>
        --><td>{{ item.presio }}</td>
        <!--<td>{{ item.categoria }}</td>
        --><td>{{ item.cantidad }}</td>
          
        
        
        
        <v-btn text @click="fn_quitar(index,item.id)">quitar</v-btn>
       <!-- <v-btn text @click="fn_suma(item.id,item.presio)"> <v-icon>mdi-plus</v-icon> </v-btn> 
       -->
        </tr>
      </tbody>
    </template>
   
  </v-simple-table>
        </v-row>
                      
  
        </v-card-actions >
        <v-card-text >
         <v-row><v-select  :items="descuentos"   label="selcctiona el descuento"  outlined v-model="desc" ></v-select>
     </v-row>
    <v-row> <v-text-field   label="otro" type="number"  step="0.1"    outlined v-model="desc" ></v-text-field>
            </v-row> 
    
<v-row> <v-btn text @click="fn_pagar2"> pagar</v-btn></v-row>     
  <v-row> <v-btn text @click="fn_pagar2"> pagar</v-btn></v-row>   
  <v-row><p>total:</p>{{sumita}}</v-row>   
  <v-row><p>total aplicando descuento:</p>{{sumadescuento}}</v-row>  
    <v-row> <v-btn text @click="dialog = false"> ocultar </v-btn></v-row>   
      </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
    </div>
</template>
<script>
import axios from 'axios'
import navegacion from './Barranavegacion'
export default {
    data(){
        return{
            productos:[],
            cantidad:1,
          sumita:0,
           i:0,
           micarrito:[],
           bandera:true,
           descuentos:['5','10','15','20','25','30','35','40'],
           desc:0,sumadescuento:0,
           quitar:0,
         dialog: false,
         contcarrito:0
        }
    }, components:{
          navegacion
        },
    mounted:function(){
          axios.get("/producto/listar").then(response => (this.productos = response.data));
             
       },
      methods:{
           fn_sumar(id ,nombre,unidad,presio,categoria){              
                     for(var i in this.micarrito){                    
                                if(id==this.micarrito[i].id){
                                  this.micarrito[i].cantidad++;
                                console.log("producto existente")
                                this.contcarrito++;
                                  this.bandera=false;
                                }else{
                                  this.bandera=true;
                                }
                          }
                          if(this.bandera){
                          console.log("producto nuevo")                                
                   this.micarrito.push({
                    id: id,
                    nombre: nombre,
                    unidad: unidad,
                    presio: presio,
                    categoria: categoria,
                    cantidad: this.cantidad
             })  
                         this.contcarrito++;                                                
                          this.bandera=true;
                          }                                                
             }, fn_quitar(index,id){
                         this.contcarrito-=1;
                        for(var i in this.micarrito){
                                if(id==this.micarrito[i].id){
                                  this.micarrito[i].cantidad--;
                                }
                                if(this.micarrito[i].cantidad<1){
                      
                        this.micarrito.splice(index,1)
                      }
                        }

                      
                         if(this.contcarrito==0){
                        
                        this.sumita=0;
                        this.sumadescuento=0;
                        this.desc="";
                         this.contcarrito=0;
                         alert("esta vacio")
                         this.dialog= false
                         this.bandera=true;
                       }
                         
                       
                }
                
            ,fn_pagar2(){
                  
                      var sumatotalcarrito=0;
                  for (var i in this.micarrito){
                  
                   sumatotalcarrito=sumatotalcarrito+(this.micarrito[i].presio*this.micarrito[i].cantidad) 
                  }
                  console.log(sumatotalcarrito)
                this.sumita=sumatotalcarrito
                  if(this.desc!=0&&sumatotalcarrito>0){
                       var descuento=((this.desc/100)*sumatotalcarrito)
                       
                       this.sumadescuento=sumatotalcarrito-descuento;
                    
                    }else{
                      this.sumatotal="aun no se selecciona un descuento"
                    }
                }
     }
    }
</script>