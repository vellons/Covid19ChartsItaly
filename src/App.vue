<template>
  <div id="app">
    <router-view class="router-view"/>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style lang="scss">
  @import "../src/style/variables.scss";
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: $primary,
    accent: $accent,
  ));
  @include md-register-theme("dark", (
    primary: $primary,
    accent: $accent,
    theme: dark
  ));
  @import "~vue-material/dist/theme/all";
  #app, .router-view {
    margin: 0;
    border: 0;
    padding: 0;
    height: 100vh;
  }
</style>
