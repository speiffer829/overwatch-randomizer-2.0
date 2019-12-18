<template>
  <div class="all-recents recents-grid">
    <span v-for="item of recents" :key="item" class="recent-item">{{ item }}</span>
  </div>
</template>


<script>
export default {
  name: "Recents",
  props:{
    recents: Array
  }
}
</script>


<style lang="scss">
  .recents-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    margin: 10px auto;
    max-width: 400px;
    text-transform: uppercase;
    text-align: center;

    .recent-item{
      background: $opac;
      display: block;
      padding: 10px 5px;
      border-radius: 5px;
      box-sizing: border-box;
      box-shadow: $shadow;
    }
  }
</style>