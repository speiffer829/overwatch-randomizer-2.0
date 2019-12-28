<template>
  <div class="all-stats">
    <transition name="move-out" mode="out-in">
      <div :key="hero.name">
        <div class="stat-group" v-for="weapon of hero.weapons" :key="weapon.name">
          <h2>{{ weapon.weaponName }}</h2>
          <div class="stat-row" v-for="stat of weapon.weaponStats" :key="stat.title">
            <p class="left">{{ stat.title }}</p>
            <p class="right">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "Stats",
  props: {
    hero: Object
  }
};
</script>


<style lang="scss">
.all-stats {
  margin: 10px auto;
  max-width: 400px;
  width: 100%;
}

.stat-group {
  max-width: 400px;
  width: 100%;
  transition: all 300ms;
}

h2 {
  font-family: $fancy;
  font-size: 2.7em;
  color: $orange;
  margin-bottom: 0;
}

.stat-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  background: $opac;
  margin: 5px 0;
  font-family: $base;
  text-transform: capitalize;
  overflow: hidden;
  box-shadow: $shadow;
  border-radius: 3px;

  p {
    padding: 0 10px;
    color: $orange;
  }

  .right {
    text-align: right;
    color: #ffffff;
  }
}

//animations

.move-out-enter-active,
.move-out-leave-active {
  transition: all 350ms;
}

.move-out-enter {
  opacity: 0;
  transform: translateX(-50px);
}
.move-out-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>