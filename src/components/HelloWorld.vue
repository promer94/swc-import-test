<template>
  <div class="hello">
    <Button></Button>
    <h1>{{ data }}</h1>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import { Button } from 'element-ui'
export default defineComponent({
  name: 'HelloWorld',
  components: {
    Button
  },
  setup() {
    const data = ref('hello')
    return {
      data
    }
  }
})
</script>

