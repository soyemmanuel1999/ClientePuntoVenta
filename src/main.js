import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import  Router from 'vue-router'
import Listarproducto from './components/Listarproducto'
import Listarcategoria from './components/Listarcategoria'
import Agregarcategoria from './components/Agregarcategoria'
import Agregarproducto from './components/Agregarproducto'
import Login from './components/Login'
import Registro from './components/Registro'
import Barranavegacion from './components/Barranavegacion'
import Venta from './components/Venta'



Vue.config.productionTip = false
Vue.use(Router)
var router =new Router(
{
    routes:[
      
      {
        name:'listarproducto',
        path:'/home/listarproducto',
          component:Listarproducto
        },
      {
        
          path:'/home/listarcategoria',
            component:Listarcategoria,
            name:'listarcategoria'
          },
      {
        
            path:'/',
              component:Login  ,
              name:'login'
      },
      {
        
        path:'/usuario/registro',
          component:Registro,
          name:'registro'
        },
        {
        
          path:'/home/agregarcategoria',
            component:Agregarcategoria,
            name:'agregarcategoria'
          },
          {
        
            path:'/home/agregarproducto',
              component:Agregarproducto,
              name:'agregarproducto'
            },
            {
        
              path:'/navegacion',
                component:Barranavegacion,
                name:'navegacion'
              },
              {
        
                path:'/home/nuevaventa',
                  component:Venta,
                  name:'venta'
                }
    ]
}  
)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
