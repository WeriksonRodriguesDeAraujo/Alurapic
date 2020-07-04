<template>
  <div>
    <h1 class="centralizado" v-meu-transform:scale.animate="1.2">{{ titulo }}</h1>
    <p class="centralizado" v-show="mensagem">{{ mensagem }}</p>
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo='foto.titulo'>   
            <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-meu-transform:rotate.animate="30"/>
            <router-link :to="{name: 'altera', params: { id : foto._id }}"><meu-botao rotulo="alterar" tipo="button"/></router-link>
            <meu-botao rotulo="remover" tipo="button" :confirmacao="true" estilo="perigo" @botaoAtivado="remove(foto)"/>
        </meu-painel>
      </li>  
    </ul>
  </div>
</template>

<script>
  
  import Painel from '../shared/painel/painel.vue'
  import imagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva.vue'
  import Botao from '../shared/botao/botao.vue'
  import Transform from '../../directives/transform.js'
  import FotoService from '../../domain/foto/fotoService.js'

  export default {

    components: {
      
      'meu-painel': Painel,
      'imagem-responsiva': imagemResponsiva,
      'meu-botao': Botao

    },

    directives: {
      'meu-transform': Transform
    },

    methods: {

      remove(foto) {
  
        this.service.apaga(foto._id)
        .then(()=> {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1);
            this.mensagem ='Foto removida com sucesso';
          }, err => {
            this.mensagem = err.message
         });
      }
    },

    data () {
      
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem: ''
      }
    },
    
    computed: {
      
      fotosComFiltro() {
        if (this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotos;
        }
      }
    },

    created() {
      this.service = new FotoService(this.$resource)

      this.service.lista()
      .then(fotos => this.fotos = fotos, err => this.mensagem = err.message)
    }
  }  

</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

  .filtro {
    display: block;
    width: 100%;
  }
</style>