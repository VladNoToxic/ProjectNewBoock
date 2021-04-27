<template>
  <header class="container">
    <div class="d-flex justify-content-between">
      <div><H3> Project new BooCk </H3></div>
      <div><router-link  :to="{ name: 'Catalog'}"> главная </router-link></div>
      <div><router-link :to="{ name: 'Admin'}"> Режим админа </router-link></div>
    </div>
  </header>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
export default {
  name: 'VHeader',
  components: {
    BRow,
    BCol
  },
  directives: { 'v-header': this }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
