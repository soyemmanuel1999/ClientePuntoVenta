<template>
    <div>
        <v-card     class="mx-auto"   max-width="600">
          
      <v-card-title>Registro</v-card-title>
   
    <v-card-text class="text--primary">
          <v-text-field   label="nombres"       outlined v-model="nombres"></v-text-field>
            <v-text-field   label="apellidos"    outlined v-model="apellidos"></v-text-field>
            <v-text-field   label="correo"       outlined v-model="correo"></v-text-field>
            <v-text-field   label="contraseña"    type="password"   outlined v-model="contrasena"></v-text-field>
  
   </v-card-text>
    <v-card-actions>
        <v-row>
            <v-btn text @click="fn_registrar"> guardar  </v-btn>  
            <v-btn text @click="fn_atras"> atrás </v-btn>
        </v-row>
    
       </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            nombres:"",
            apellidos:"",
            correo:"",
            contrasena:"",
            conectado:false,
            respuesta:false
        }
    },
    methods:{
        fn_registrar(){
            const formData=new FormData;
             formData.append("nombres",this.nombres)
             formData.append("apellidos",this.apellidos)
             formData.append("correo", this.correo)
             formData.append("contrasena",this.contrasena)
             
           axios.post('/usuario/nuevo',formData).then(
               console.log("se completo la peticion"),
            this.fn_ingresar
         )
        },
        fn_ingresar:function(response){
            this.respuesta=response.data;
            if(this.respuesta){
                console.log("guardado")
                var formData=new FormData();
            formData.append("correo",this.correo)
            formData.append("contrasena",this.contrasena)
            axios({
                        method: 'post',
                        url: 'usuario/login',
                        data: formData
                    }).then(this.fn_loginexitoso).catch(function (error) {
                        console.log(error);
                    });  
            }
        },
        
        fn_loginexitoso: function (response){
                this.conectado=response.data
                if(this.conectado){
                    //router
                    console.log("estoy listando")
                }
        }, fn_atras(){
            this.$router.push("/");
        } 

    }
}
</script>