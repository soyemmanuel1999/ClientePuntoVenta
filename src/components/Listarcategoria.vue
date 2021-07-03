<template>
    <div><navegacion/>
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
          
      <v-card-title>categorias</v-card-title>
        <v-simple-table>
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">id</th>
                <th class="text-left">nombre</th>
                <th class="text-left">status</th>
                </tr>
            </thead>
            <tbody>
                <tr    v-for="item in categorias"   :key="item.id">
                     <td>{{ item.id }}</td>
                     <td>{{ item.nombre }}</td>
                     <td>{{ item.status }}</td>
                     <v-btn text @click="fn_editar(item.id)">  editar </v-btn>
                     <v-btn text @click="fn_borrar(item.id)">  eliminar </v-btn>
                </tr>
            </tbody>
            </template>
           
        </v-simple-table>
         <v-btn   @click="agregarcategoria"  color="pink"  fab   dark   small   absolute   bottom   right>
             <v-icon>mdi-plus</v-icon>
        </v-btn>
          </v-card>
           <div v-if="editarcategoria"><v-card     class="mx-auto"   max-width="600">
          
        <!-- <navegacion/>
        
      <v-card-title>agregar categoria</v-card-title>
   -->
    <v-card-text class="text--primary">
          <v-text-field   label="nombre"  outlined v-model="nombrecategoria"></v-text-field>
       <v-select  :items="statuselect"  label="status"  outlined v-model="status"></v-select>
          
   </v-card-text>
    <v-card-actions>
        <v-row>
            <v-btn text @click="fn_editaraction"> guardar  </v-btn>  
            <v-btn text @click="atras"> atrás </v-btn>
        </v-row>
    
       </v-card-actions>
        </v-card>
    </div>
    </div>
</template>
<script>
import axios from "axios"

import navegacion from './Barranavegacion'
export default {
    data(){
        return{
        categorias:[],
        datos:[],
        editarcategoria:false,
        nombrecategoria:"",
        status:"",
        id:"",statuselect:['1','0']
        }
        },
      components:{
         navegacion
       }
     ,mounted:function(){
       axios.get("/categoria/listar").then(response => (this.categorias = response.data));
    },
    methods:{
         fn_borrar(id){
          axios.get("/categoria/borrar",{
         params:{ 
           id : id 
          },
             }).then(this.fn_actualizar);
          },
      
          fn_actualizar(){
         axios.get("/categoria/listar").then(response => (this.categorias = response.data));
            console.log("actualizado")
       
                 },
            agregarcategoria(){
           this.$router.push("/home/agregarcategoria")
            },verproducto(){
          this.$router.push("/home/listarproducto")
            },vercategoria(){
          this.$router.push("/home/listarcategoria")
      },
      fn_editar(id){
          this.editarcategoria=true
          this.id=id
      },
      fn_editaraction(){
         axios.get("/categoria/editar",{
      params:{ 
        id : this.id,
        nombre: this.nombrecategoria,
        status:this.status
      }
    }).then(console.log("editado"),this.fn_actualizar,this.editarcategoria=false);
        },
        
        atras(){
             this.$router.push("/home/listarcategoria")
             this.editarcategoria=false
        },
      
     
     
      
    }  
}
</script>