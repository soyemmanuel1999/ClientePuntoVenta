<template>
    <div><navegacion/><v-card     class="mx-auto"   max-width="600">
          
        <!-- <navegacion/>
        
      <v-card-title>agregar categoria</v-card-title>
   -->
    <v-card-text class="text--primary">
          <v-text-field   label="nombre"       outlined v-model="nombre"></v-text-field>
     
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
import navegacion from './Barranavegacion'
import axios from "axios"
export default {
    data(){
        return{
            nombre:"",
            datos:[]
        }
    },
      components:{
         navegacion
       },
      
    methods:{
        fn_nuevo(){
            const formData=new FormData();
            formData.append("nombre",this.nombre)
            
            axios.post('/categoria/nuevo',formData).then(
               console.log("se completo la peticion"),
            this.fn_agregado()
         )
        },
        fn_agregado(){
         this.$router.push("/home/listarcategoria")  
        },
        atras(){
             this.$router.push("/home/listarcategoria")
        },
     
   

    }
}
</script>