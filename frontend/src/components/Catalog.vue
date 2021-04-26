/* eslint-disable no-tabs */
<template>
  <div class="container book">
    <b-row>
      <b-overlay
          :show="loading"
          variant="transparent"
          opacity="1"
          blur="3px"
      >
      <b-col lg="12" v-if="data.list && data.list.length">
        <b-row>
          <b-col v-for="(book, index) of data.list" :key="index" lg="4">
            <v-card :data="book" />
          </b-col>
        </b-row>
        <b-pagination
            v-model="page"
            :total-rows="data.count"
            :per-page="perPage"
            first-number
            last-number
            @change="updateNavigation"
          ></b-pagination>
      </b-col>
      </b-overlay>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import { HTTP } from '../http.js'
import Vcard from '@/components/VCard'
export default {
  name: 'Catalog',
  components: {
    BRow,
    BCol,
    'v-card': Vcard
  },
  data: () => {
    return {
      data: {},
      page: 1,
      perPage: 9,
      loading: true
    }
  },
  methods: {
    updateNavigation (page) {
      this.loading = true
      HTTP.get('book/gets', {
        params: { page: page, perpage: this.perPage }
      }).then(res => {
        this.loading = false
        this.data = res.data
      })
    }
  },
  created () {
    HTTP.get('book/gets', {
      params: { page: 1, perpage: this.perPage }
    }).then(res => {
      this.data = res.data
      this.loading = false
    })
  }
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
.filter {
  background-color: aqua;
}
</style>
