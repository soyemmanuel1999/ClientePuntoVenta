<template>
    <div>
        <navegacion/>
  <!--<v-data-table  :headers="headers"  :items="productos"  :items-per-page="5"   class="elevation-1" 
    loading-text="Loading... Please wait" >
    <button> </button>
    
    </v-data-table>-->
    <v-bottom-navigation  :value="value"  color="teal"   grow >
    <v-btn @click="verproducto">
      <span>ver productos</span>
      <v-icon>mdi-clipboard-list</v-icon>
    </v-btn>
    <v-btn @click="vercategoria">
      <span>ver categorias</span>
      <v-icon>mdi-clipboard-list-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
    <v-card class="mx-auto" max-width="800"> 
      <v-card-title primary-title>
        productos
      </v-card-title>
    <v-simple-table>
    <template v-slot:default>
      <thead>
          <tr>
          <th class="text-left">   id </th>
          <th class="text-left">   nombre </th>
          <th class="text-left">   unidad </th>
           <th class="text-left">  status </th>
          <th class="text-left">   cantidad </th>
           <th class="text-left">   precio </th>
          <th class="text-left">   categoria </th>
          </tr>
      </thead>
      <tbody>
        <tr    v-for="item in productos"   :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
           <td>{{ item.unidad }}</td>
         <td>{{ item.status }}</td>
         <td>{{ item.cantidad }}</td>
        <td>{{ item.presio }}</td>
        <td>{{ item.categoria }}</td>
        <v-btn text @click="fn_editar(item.id)">   editar  </v-btn>  <v-btn text @click="fn_borrar(item.id)">    eliminar  </v-btn>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
                <v-btn  @click="agregarproducto" color="pink"  fab  dark  small  absolute   bottom    right  >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
    </v-card>
      <div v-if="editarproducto">
        
        <v-card     class="mx-auto"   max-width="600">
          
   <!--   <v-card-title>agregar producto</v-card-title>
   -->
    <v-card-text class="text--primary">
          <v-text-field   label="nombre"       outlined v-model="nombre"></v-text-field>
          <v-select  :items="unidadselect" label="unidad"  outlined v-model="unidad"></v-select>
     
            <v-text-field   label="cantidad"   type="number"      outlined v-model="cantidad"></v-text-field>
            <v-text-field   label="precio" type="number"  step="0.1"    outlined v-model="presio"></v-text-field>
            <v-select  :items="statuselect"  label="status"  outlined v-model="status"></v-select>
            <v-select  :items="categorias" item-text="nombre" item-value="id" label="categoria"  outlined v-model="idcategoria"></v-select>
     
   </v-card-text>
    <v-card-actions>
        <v-row>
            <v-btn text @click="fn_editaraccion"> guardar  </v-btn>  
            <v-btn text @click="atras"> atrás </v-btn>
        </v-row>
    
       </v-card-actions>
        </v-card>
    </div>
</div>

</template>
  
<script>
import navegacion from './Barranavegacion'
import axios from "axios"
    export default{
        data(){
            return{
            
        productos:[]
        ,item:"",
        value:"0",
            unidadselect:['pieza','caja'],
            statuselect:['1','0'],
            nombre:"",
            unidad:"",
            status:0,
            cantidad:0,
            presio:0,
            idcategoria:0,
            editarproducto:"",
            id:"",
            categorias:[]
            }
        },
        components:{
          navegacion
        },
        mounted:function(){
                console.log("estoy en el mounted")
                axios.get("/producto/listar").then(response => (this.productos = response.data));
               axios.get("/categoria/listar").then(response => (this.categorias = response.data));
   
       },
        methods:{

         fn_borrar(id){
        axios.get("/producto/borrar",{
      params:{ 
        id : id 
      },
    }).then(this.fn_actualizar);
      },
      
      fn_actualizar(){
          axios.get("/producto/listar").then(response => (this.productos = response.data));
       console.log("actualizado")
       
      },verproducto(){
          this.$router.push("/home/listarproducto")
      },vercategoria(){
          this.$router.push("/home/listarcategoria")
      },
      agregarproducto(){
         this.$router.push("/home/agregarproducto")
      },
      fn_editar(id){
          this.editarproducto=true
          this.id=id
      },
      fn_editaraccion(){
        axios.get("/producto/editar",{
      params:{ 
        id : this.id,
        nombre:this.nombre,
        unidad:this.unidad,
        status:this.status,
        cantidad:this.cantidad,
        presio:this.presio,
        idcategoria:this.idcategoria
      }
    }).then(this.fn_actualizar,this.editarproducto=false);
      }, atras(){
             this.$router.push("/home/listarcategoria")
             this.editarproducto=false
        },
     
        }

    }
</script>
