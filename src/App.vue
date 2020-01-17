<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div v-if="loaded">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  async created(){
    let dispatchinshit = await this.$store.dispatch('bindHeros');
      if(dispatchinshit){
        this.loaded = true;
      }
  },
  data() {
    return {
      loaded: false
    }
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100%;
  max-width: 415px;
  margin: 0 auto;
  background: $dark;
  min-height: 100vh;
  padding-bottom: 30px;

  @media screen and (min-width: 416px) {
    border-radius: 10px;
    overflow: hidden;
    margin: 20px auto;
    box-shadow: 0 0px 10px rgba(darken($orange,20%), 1);
    min-height: calc(100vh - 40px);
  }
}

button{
  cursor: pointer;
}

.wrap{
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

</style>
