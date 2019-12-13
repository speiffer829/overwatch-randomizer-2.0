<template>
  <div class="home">
    <div class="hero-img-contain">
      <img :src="img" alt="">
    </div>
    <p>{{ hero.name }}</p>
    <button class="btn" @click="choose(0)" >CHOOSE</button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      heros: [],
      hero: Object,
      checks: [],
      index: -1,
     powerup: '',
     recents:[],
     repeatGuard: true,
     loaded: false,
     img: String
    };
  },
  mounted() {
    console.log(this.$store.state.heros);
  },
  methods: {
    choose(crashGuard) {
      var list = [];
      // var current = this.hero.name;
      if (this.checks.length !== 0) {
        var i;

        for (i = 0; i < this.$store.state.heros.length; i++) {
          var role = this.$store.state.heros[i].role;

          if (this.checks.includes(role)) {
            list.push(this.$store.state.heros[i]);
          }
        }
      } else {
        var dice1 = Math.floor(Math.random() * 60);
        var dice2 = Math.floor(Math.random() * 60);
        if (dice1 == dice2) {
          list = list.concat({ name: "Free Pick" });
        } else {
          list = list.concat(this.$store.state.heros);
        }
      }

      if (crashGuard > 10) {
        this.recents = [];
        this.hero = list[Math.floor(Math.random() * list.length)];
        this.index = this.$store.state.heros.indexOf(this.hero);
        this.recents.push(this.hero.name);
        console.log("crashGuard Error");
        return;
      }

      this.hero = list[Math.floor(Math.random() * list.length)];
      this.index = this.$store.state.heros.indexOf(this.hero);

      if (
        this.recents.includes(this.hero.name) == true &&
        this.repeatGuard == true
      ) {
        crashGuard++;
        console.log("got one " + this.hero.name);
        this.choose(crashGuard);
        return;
      }

      this.recents.unshift(this.hero.name);
      if (this.recents.length >= 1) {
        this.recents.pop();
      }

      // this.img = '/hero-imgs/hanzo.jpg'
      this.img = '/hero-imgs/'+this.hero.name.toLowerCase()+'.jpg'

      localStorage.setItem("recents", JSON.stringify(this.recents));
    }
  }
};
</script>

<style lang="scss">
  .hero-img-contain{
    height: 250px;
    overflow: hidden;

    img{
      min-height: 250px;
      width: 100%;
    }
  }
</style>
