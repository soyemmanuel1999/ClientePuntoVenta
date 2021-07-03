<template>
  <v-bottom-navigation  :value="value"  color="primary"   grow relative  >
    <v-btn @click="verclientes">
      <span>clientes</span>
      <v-icon>mdi-clipboard-account-outline</v-icon>
    </v-btn>
    <v-btn @click="verproductos">
      <span>productos</span>
      <v-icon>mdi-view-list</v-icon>
    </v-btn>
    <v-btn @click="vernuevaventa">
      <span>nueva venta</span>
      <v-icon>mdi-store-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
  export default {
    data: () => ({ value: 1 }),
    methods:{
        verproductos(){
             this.$router.push("/home/listarproducto")
        },
        vernuevaventa(){
             this.$router.push("/home/nuevaventa")
        }
    }    
  }
  
</script>