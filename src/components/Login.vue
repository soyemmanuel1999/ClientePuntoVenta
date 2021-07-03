<template>
    <div>
        <v-card     class="mx-auto"   max-width="600">
            <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/tienda.png"
    >
      <v-card-title>Tienda</v-card-title>
    </v-img>
    <v-card-text class="text--primary">
          <v-text-field   label="correo"       outlined v-model="correo"></v-text-field>
            <v-text-field   label="contraseña"    type="password"   outlined v-model="contrasena"></v-text-field>
   </v-card-text>
    <v-card-actions>
        <v-row>
            <v-btn text @click="fn_ingresar"> iniciar sesion  </v-btn>  
            <v-btn text @click="fn_registro"> registrarme  </v-btn>
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
            correo:"",
            contrasena:"",
            conectado:false
        }
    },
    methods:{
        fn_ingresar(){
            
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
        },
        fn_loginexitoso: function (response){
                this.conectado=response.data
                if(this.conectado){
                    alert("conectado")
                    this.$router.push("/home/listarproducto")
                    //router
                }else{
                    alert("usuario o contraseña incorrectos")
                }

        },
        fn_registro(){
            this.$router.push('/usuario/registro')
        
        }
        
    }

}
</script>