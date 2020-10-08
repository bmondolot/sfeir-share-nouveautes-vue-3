<template>
  <h1>Random quotes !</h1>

  <random-quote></random-quote>
</template>

<script>
import RandomQuote from './quote/RandomQuote'

export default {
  name: 'App',
  components: {
    RandomQuote
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
