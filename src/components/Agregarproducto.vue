<template>
    <div>
        <navegacion/>
        <v-card     class="mx-auto"   max-width="600">
          
   <!--   <v-card-title>agregar producto</v-card-title>
   -->
    <v-card-text class="text--primary">
          <v-text-field   label="nombre"       outlined v-model="nombre"></v-text-field>
          <v-select  :items="unidadselect" item-text="nombre" item-value="id" label="unidad"  outlined v-model="unidad"></v-select>
     
            <v-text-field   label="cantidad"   type="number"      outlined v-model="cantidad"></v-text-field>
            <v-text-field   label="precio" type="number"  step="0.1"    outlined v-model="presio"></v-text-field>
            <v-select  :items="categorias" item-text="nombre" item-value="id" label="categoria"  outlined v-model="idcategoria"></v-select>
     
   </v-card-text>
    <v-card-actions>
        <v-row>
            <v-btn text @click="fn_nuevo"> guardar  </v-btn>  
            <v-btn text @click="atras"> atrás </v-btn>
        </v-row>
    
       </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import axios from "axios"
import navegacion from './Barranavegacion'
export default {
    data(){
        return{
            nombre:"",
            unidad:"",
            cantidad:0,
            presio:0,
            idcategoria:"",
            categorias:[],
            unidadselect:['pieza','caja']
            
            
        }
    },
    components:{
          navegacion
        },
    methods:{
        fn_nuevo(){
            const formData=new FormData();
            formData.append("nombre",this.nombre)
            formData.append("unidad",this.unidad)
            formData.append("cantidad",this.cantidad)
            formData.append("presio",this.presio)
            formData.append("idcategoria",this.idcategoria)
             axios.post('/producto/nuevo',formData).then(
               console.log("se completo la peticion"),
            this.fn_agregado()
         )
        },
    
        fn_agregado(){
            alert("guardado")
             this.$router.push("/home/listarproducto")
        //router    
        },
        atras(){
             this.$router.push("/home/listarproducto")
        }
    },mounted:function(){
            axios.get("/categoria/listar").then(response => (this.categorias = response.data));
    }
}
</script>