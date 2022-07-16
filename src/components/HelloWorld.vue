<template>
  <div class="hello">
    <h1>{{ data }}</h1>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const data = ref('hello')
    return {
      data
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
