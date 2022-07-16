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

