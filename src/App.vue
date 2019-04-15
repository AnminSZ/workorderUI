<template>
  <div id="app">
    <!-- <order-list></order-list> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import OrderList from './components/OrderList'
export default {
  name: 'App',
  components:{
    'order-list':OrderList
  }
}
</script>

<style scoped>
#app {

}
</style>
