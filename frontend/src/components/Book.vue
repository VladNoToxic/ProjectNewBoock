<template>
  <div class="book container">
    <b-row>
      <b-col lg="5">
        <img
          style="max-height: 600px"
          alt="Vue logo"
          :src="`http://localhost:3000/images/full-${data.art}.png`"
        />
      </b-col>
      <b-col class="text" lg="7">
        <h2>{{ data.name }}</h2>
        <h4>{{ data.author.label }}</h4>
        <div class="cutter"></div>
        <b-row class="d-flex align-items-center align-self-center">
          <b-col lg="6">
            <div class="book-item">
              <div class="book-desc">Артикул</div>
              <div class="book-value">{{ data.art }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Издательство</div>
              <div class="book-value">{{ data.creators }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Жанр</div>
              <div class="book-value">{{ data.genre }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Год издания</div>
              <div class="book-value">{{ data.year }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Кол-во страниц</div>
              <div class="book-value">{{ data.pages }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Тип обложки</div>
              <div class="book-value">{{ data.type_front }}</div>
            </div>
            <div class="book-item">
              <div class="book-desc">Тираж</div>
              <div class="book-value">{{ data.amount }}</div>
            </div>
          </b-col>
          <b-col lg="6">
            <div class="price d-flex justify-content-center align-items-center align-self-center"> <h4 class="pr-3">Цена {{data.cost}} руб.</h4> <b-button variant="outline-primary"> Купить </b-button></div>
          </b-col>
        </b-row>
        <div style="padding-top: 25px">
            <div class="book-desc">Аннотация</div>
            <p>{{data.annotation}}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { HTTP } from '../http.js'
export default {
  name: 'Book',
  data: () => {
    return {
      data: {}
    }
  },
  created () {
    HTTP.get('book/get', { params: { id: this.$route.params.id } }).then(
      res => {
        this.data = res.data
      }
    )
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
</style>
