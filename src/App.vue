
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
      <h1>tienda</h1></div>
    </v-app-bar>

    <v-main>
     <!-- <Listarproducto/>
      <Login/>
      <Registro/>
      <Listarcategoria/>
      <Agregarproducto/>
      <Agregarcategoria/>-->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
/*import Listarproducto from './components/Listarproducto';
import Login from './components/Login';
import Listarcategoria from './components/Listarcategoria';
import Registro from './components/Registro';
import Agregarproducto from './components/Agregarproducto';
import Agregarcategoria from './components/Agregarcategoria';*/
export default {
  name: 'App',

  components: {
    //Listarproducto,Login,Registro,Listarcategoria,Agregarproducto,Agregarcategoria
  
},

  data: () => ({
    //
  }),
};
</script>
