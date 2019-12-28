<template>
  <div class="home">
    <div class="hero-img-contain">
      <transition name="fade" mode="out-in">
        <img :src="img" alt :key="hero.name" rel="preload" />
      </transition>

      <div class="name-group">
        <transition name="slide-left" mode="out-in">
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
      <!-- .filters -->
    </div>

    <div class="info-box">
      <div class="info-btn-group">
        <button
          class="btn"
          :class="{'active' : infoStatus == 'Stats'}"
          @click="infoStatus = 'Stats'"
        >Stats</button>
        <button
          class="btn"
          :class="{'active' : infoStatus == 'Recents'}"
          @click="infoStatus = 'Recents'"
        >Recents</button>
      </div>

      <div class="info-page">
        <transition name="fade-up" mode="out-in">
          <component :is="infoStatus" :hero="hero" :recents="recents"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Stats from "@/components/Stats.vue";
import Recents from "@/components/Recents.vue";

export default {
  name: "home",
  components: {
    Stats,
    Recents
  },
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
      filterDrawer: false,
      infoStatus: "Stats"
    };
  },
  async mounted() {
    this.heros = await this.$store.state.heros;
    if (localStorage.getItem("recents")) {
      this.recents = JSON.parse(localStorage.getItem("recents"));
    }

    var tempImg = [];
    let imgName;
    for (var x = 0; x < this.heros.length; x++) {
      tempImg[x] = new Image();
      
      if (this.heros[x].img) {
        imgName = this.heros[x].img;
      } else {
        imgName = this.heros[x].name.toLowerCase();
      }
      tempImg[x].src = `/hero-imgs/ashe.png`;
      console.log(imgName)
    }
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
        if (this.hero.img) {
          this.img = `/hero-imgs/${this.hero.img.toLowerCase()}.png`;
        } else {
          this.img = `/hero-imgs/${this.hero.name.toLowerCase()}.png`;
        }
        this.recents.unshift(this.hero.name);
        this.loopSentinal = 0;
        if (this.recents.length >= 10) {
          this.recents.pop();
        }
        localStorage.setItem("recents", JSON.stringify(this.recents));
      } else {
        this.loopSentinal++;
        if (this.loopSentinal < 10) {
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
  padding-top: 30px;

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
    background: linear-gradient(to top, $dark 10%, rgba($dark, 0) 75%);
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
    width: 90%;

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
  max-width: 400px;
  width: 90%;
  margin: 10px auto;
  grid-gap: 5px;
}

.filters {
  margin: 0px 0 30px;
  position: relative;
  width: 100%;
  justify-content: center;
  max-width: 350px;
}

.filter-form {
  width: 90%;
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
  transition: all 0.2s;
  border-radius: 3px;
  &:active {
    transform: scale(0.9);
  }

  &:first-of-type {
    border-radius: 3px 3px 3px 20px;
  }

  &:last-of-type {
    border-radius: 3px 3px 20px 3px;
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
  background: rgba(#fff, 0.1);
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
  border-radius: 20px 20px 3px 3px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }
}

.info-page {
  width: 95%;
}

.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;

  .info-btn-group {
    display: grid;
    margin: 30px auto 10px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
  }

  button {
    background: $opac;
    border: none;
    padding: 10px 20px;
    color: #ffffff;
    font-size: 16px;
    font-family: $base;
    text-transform: uppercase;
    box-shadow: $shadow;
    transition: all 0.2s;

    &:first-of-type {
      border-radius: 10px 3px 3px 10px;
    }

    &:last-of-type {
      border-radius: 3px 10px 10px 3px;
    }

    &:active {
      transform: scale(0.9);
    }

    &.active {
      color: $dark;
      background: $orange;
    }
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

.slide-left-enter {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 350ms;
}

.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
