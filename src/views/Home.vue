<template>
  <div class="home">
    <div class="hero-img-contain">
      <transition name="fade" mode="out-in">
        <img :src="img" alt :key="hero.name" />
      </transition>

      <div class="name-group">
        <transition name="slide-left-delay" mode="out-in">
          <p class="hero-role" :key="hero.role">{{ hero.role }}</p>
        </transition>
        <transition name="slide-left" mode="out-in">
          <p class="hero-name" :key="hero.name">{{ hero.name }}</p>
        </transition>
      </div>
    </div>

    <div class="control-group">
      <div class="choose-row">
        <button class="pick-btn" v-on:click="choose()">CHOOSE</button>
        
        
        <div class="filter-btn">
          <label>
            <input type="checkbox" name="filters" id="tank" value="tank" v-model="checks" />
            <span>Tank</span>
          </label>
        </div>

        <div class="filter-btn">
          <label>
            <input type="checkbox" name="filters" id="damage" value="damage" v-model="checks" />
            <span>Damage</span>
          </label>
        </div>

        <div class="filter-btn">
          <label>
            <input type="checkbox" name="filters" id="support" value="support" v-model="checks" />
            <span>Support</span>
          </label>
        </div>
      
      
      </div>

      <div class="control-drawer">
        
      </div>

      <!-- .filters -->
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      heros: [],
      hero: { name: "Overwatch App", role: "Poo Touchers Unofficial" },
      checks: [],
      recents: [],
      repeatGuard: true,
      loaded: false,
      img: "/logo.svg",
      loopSentinal: 0,
      filterDrawer: false
    };
  },
  mounted() {
    this.heros = this.$store.state.heros;
  },
  methods: {
    choose() {
      let theHero;
      theHero = this.heros[Math.floor(Math.random() * this.heros.length)];

      if (
        (this.checks == 0 || this.checks.includes(theHero.role)) &&
        this.recents.includes(theHero.name) === false
      ) {
        this.hero = theHero;
        this.img = `/hero-imgs/${this.hero.name.toLowerCase()}.png`;
        this.recents.unshift(this.hero.name);
        this.loopSentinal = 0;
        if(this.recents.length >= 11){
          this.recents.pop();
        }
      } else {
        this.loopSentinal++;
        if (this.loopSentinal < 11) {
          this.choose();
        } else {
          this.recents = [];
          this.choose();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.hero-img-contain {
  height: 450px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  background: $orange;

  img {
    max-width: 90%;
    margin: 10px auto 0;
    position: relative;
    display: block;
    z-index: 10;
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, $dark 10%, rgba($orange, 0) 98%);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
  }

  .name-group {
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 50;
    padding: 0 20px;
    font-family: $fancy;

    .hero-name {
      font-size: 4.7em;
      margin: 0;
      color: $orange;
      line-height: 0.8em;
    }

    .hero-role {
      margin: 0;
      font-size: 1.5em;
      text-transform: uppercase;
    }
  }
}



.choose-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 350px;
  width: 90%;
  margin: 10px auto;
  grid-gap: 5px;
}

.filters {
  margin: 0px 0 30px;
  position: relative;
  width: 100%;
  
  justify-content: center;
  max-width: 330px;
}

.filter-form {
  width: 95%;
  // border: solid 2px $orange;
  border-radius: 0px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
}

.filter-btn {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  display: block;
  box-shadow: $shadow;
  overflow: hidden;
  
  &:first-of-type{
    border-radius: 0 0 0 20px;
  }

  &:last-of-type{
    border-radius: 0 0 20px 0;
  }
}

.filter-btn label {
  width: 100%;
  display: block;
}

.filter-btn label span {
  padding: 10px 0px;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  transition: all 0.25s;
  background: rgba(#fff,0.1);
}

.filter-btn label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.filter-btn input:checked + span {
  background: $orange;
  color: $dark;
}




.pick-btn {
  grid-column: span 3;
  padding: 15px;
  background: $orange;
  font-family: $fancy;
  color: $dark;
  font-size: 3em;
  border: none;
  outline: none;
  box-shadow: $shadow;
  border-radius: 20px 20px 0 0;
  // border-bottom: solid darken($orange, 10%) 2px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }
}

//animations
.fade-enter-active,
.fade-leave-active {
  transition: all 350ms;
}

.fade-enter {
  opacity: 0;
  transform: scale(0.7);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.3);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 350ms;
}
.slide-left-delay-enter-active,
.slide-left-delay-leave-active {
  transition: all 350ms;
}

.slide-left-enter,
.slide-left-delay-enter {
  transform: translateX(-300px);
  opacity: 0;
}

.slide-left-leave-to,
.slide-left-delay-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}
</style>
