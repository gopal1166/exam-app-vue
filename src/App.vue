<template>
  <div id="app">
    
    <router-view></router-view>
     
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Input, Table, Modal } from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css'; // 


Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(Modal)

export default {
  name: 'App',
   mounted() {
    window.localStorage.clear();
  },
}
</script>

<style>
#app {
  
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
