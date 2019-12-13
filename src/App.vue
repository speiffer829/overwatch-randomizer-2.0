<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('bindHeros');
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  width: 100%;
  max-width: 415px;
  margin: 0 auto;
  background: $dark;
  min-height: 100vh;

  @media screen and (min-width: 416px) {
    border-radius: 10px;
    overflow: hidden;
    margin: 20px auto;
    box-shadow: 0 0px 10px rgba(darken($orange,20%), 1);
    min-height: calc(100vh - 40px);
  }
}

</style>
