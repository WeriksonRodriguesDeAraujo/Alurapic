<template>
    <div class="painel">
        <h2 class="painel-titulo" @dblclick="visible = !visible">{{ titulo }}</h2>
        <transition name="painel-fade">
            <div class="painel-corpo" v-show='visible'>
                <slot></slot>
            </div>
        </transition>    
    </div>
</template>

<script>
  export default {

      name: 'painel',
      
      props: ['titulo'],

      data() {

          return {
              visible: true
          }
      }
  }
</script>

<style scoped>
   .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .painel-fade-enter, .painel-fade-leave-active {
    opacity: 0
  }

  .painel-fade-enter-active, .painel-fade-leave-active {
    transition: opacity .4s
  }  

  .painel-corpo {
    overflow: hidden;
  }
</style>
