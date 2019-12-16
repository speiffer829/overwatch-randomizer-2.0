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
        <button class="filter-drawer-btn" @click="filterDrawer = !filterDrawer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="12"
            height="42"
            viewBox="0 0 12 42"
            class="filter-svg"
          >
            <defs>
              <clipPath id="clip-path">
                <rect class="cls-1" width="12" height="42" />
              </clipPath>
            </defs>
            <g id="Repeat_Grid_5" data-name="Repeat Grid 5" class="cls-2">
              <g transform="translate(-225 -425)">
                <g
                  id="Ellipse_2"
                  data-name="Ellipse 2"
                  class="cls-3"
                  :class="{filled : checks.length}"
                  transform="translate(225 425)"
                >
                  <circle class="cls-4" cx="6" cy="6" r="6" />
                  <circle class="cls-1" cx="6" cy="6" r="4" />
                </g>
              </g>
              <g transform="translate(-225 -410)">
                <g
                  id="Ellipse_2-2"
                  data-name="Ellipse 2"
                  class="cls-3"
                  :class="{filled : checks.length}"
                  transform="translate(225 425)"
                >
                  <circle class="cls-4" cx="6" cy="6" r="6" />
                  <circle class="cls-1" cx="6" cy="6" r="4" />
                </g>
              </g>
              <g transform="translate(-225 -395)">
                <g
                  id="Ellipse_2-3"
                  data-name="Ellipse 2"
                  class="cls-3"
                  :class="{filled : checks.length}"
                  transform="translate(225 425)"
                >
                  <circle class="cls-4" cx="6" cy="6" r="6" />
                  <circle class="cls-1" cx="6" cy="6" r="4" />
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>

      <div class="control-drawer">
        <div class="filters">
          <form class="filter-form">
            <div class="filter-btn">
              <label>
                <input type="checkbox" name="filters" id="tank" value="Tank" v-model="checks" />
                <span>Tank</span>
              </label>
            </div>

            <div class="filter-btn">
              <label>
                <input type="checkbox" name="filters" id="damage" value="Damage" v-model="checks" />
                <span>Damage</span>
              </label>
            </div>

            <div class="filter-btn">
              <label>
                <input type="checkbox" name="filters" id="support" value="Support" v-model="checks" />
                <span>Support</span>
              </label>
            </div>
          </form>
        </div>
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
    }
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
        this.recents.push(this.hero.name);
        this.loopSentinal = 0;
        console.log(this.recents);
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
    }
  }
}

.control-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-drawer {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.filters {
  margin: 0px 0 30px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 330px;
}

.filter-form {
  width: 95%;
  border: solid 2px $orange;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
}

.filter-btn {
  position: relative;
  flex: 1 1 33.3333333%;
  box-sizing: border-box;

  text-align: center;
  display: block;
}

.filter-btn label {
  width: 100%;
}

.filter-btn label span {
  padding: 10px 0px;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Roboto Condensed", sans-serif;
  color: #fff;
  transition: all 0.25s;
}

.filter-btn label input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.filter-btn input:checked + span {
  background: $orange;
  color: #fff;
}

.choose-row {
  display: grid;
  grid-template-columns: 6fr minmax(30px, 1fr);
  max-width: 350px;
  width: 90%;
  margin: 10px auto;
  grid-gap: 15px;
}

.filter-drawer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $orange;
  font-family: "Noodle", "Roboto Condensed", sans-serif;
  color: $dark;
  font-size: 3em;
  border: none;
  outline: none;
  box-shadow: $shadow, 0 0px 20px 2px rgba($orange, 0.8);
  border-radius: 15px;
  border-bottom: solid darken($orange, 10%) 2px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }

  .filter-svg {
    .cls-1 {
      fill: none;
    }

    .cls-2 {
      clip-path: url(#clip-path);
    }

    .cls-3 {
      fill: none;
      stroke: #3a3f43;
      stroke-width: 2px;
      transition: all 250ms;

      &.filled{
        fill: #3a3f43;
      }
    }

    .cls-4 {
      stroke: none;
    }
  }
}

.pick-btn {
  max-width: 300px;
  padding: 15px;
  background: $orange;
  font-family: "Noodle", "Roboto Condensed", sans-serif;
  color: $dark;
  font-size: 3em;
  border: none;
  outline: none;
  box-shadow: $shadow, 0 0px 20px 2px rgba($orange, 0.8);
  border-radius: 15px;
  border-bottom: solid darken($orange, 10%) 2px;
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
