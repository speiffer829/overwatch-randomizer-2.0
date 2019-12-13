<template>
  <div class="home">
    <p v-for="hero in $store.state.heros" :key="hero.name">{{ hero.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      heros:[]
    }
  },
  mounted() {
    console.log(this.$store.state.heros);
  },
}
</script>
