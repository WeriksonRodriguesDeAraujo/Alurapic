import Home from './components/home/home.vue';
import Cadastro from './components/cadastro/cadastro.vue';

export const routes = [
    { path: '/', component: Home, name: 'home', titulo:'Home', menu:true},
    { path: '/cadastro', component: Cadastro, name: 'cadastro', titulo:'Cadastro', menu:true},
    { path: '/cadastro/:id', component: Cadastro, name: 'altera', titulo:'Cadastro', menu:false},
    {path: '*', component: Home, menu:false}
];