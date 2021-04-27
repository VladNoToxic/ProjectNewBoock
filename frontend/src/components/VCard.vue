<template>
  <div class="vcard">
    <img alt="Vue logo" :src="`http://localhost:3000/images/preview-${data.id}.png`" />
    <p class="name">
      {{ data.name }}
    </p>
    <p class="author">
      {{ data.author }}
    </p>
    <div class="cardbutton">
      <p class="cost">{{ data.cost }} руб.</p>
      <b-button variant="outline-primary" :to="{ name: 'Book', params: { id: data.id } }"> Подробнее </b-button>
    </div>
  </div>
</template>

<script>
import { BRow, BCol, BButton, BImg } from 'bootstrap-vue'
export default {
  name: 'VCard',
  components: {
    BRow,
    BCol,
    BButton,
    BImg
  },
  props: {
    data: Object
  },
  directives: { 'v-card': this }
}
</script>
