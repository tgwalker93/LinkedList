<template>
  <div id="app">
    <div class="container">
  
      <div class="row col-md-6 offset-md-3">
        <create-linked-list></create-linked-list>
  
      </div>
  
    </div>
  
  </div>
</template>


<script>
  import CreateLinkedList from './CreateLinkedList.vue';

  
  
  
  export default {
  
    name: 'app',
  
    data() {
  
      return {}
  
    },
  
    components: {
  
      CreateLinkedList
  
    },
  
  
  
  }
</script>


<style>
  .fade-enter-active,
  
  .fade-leave-active {
  
    transition: opacity .5s
  
  }
  

  .fade-enter,
  
  .fade-leave-active {
  
    opacity: 0
  
  }
</style>