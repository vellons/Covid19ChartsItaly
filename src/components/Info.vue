<template>
  <div id="info-container">
    <div class="middle-center">
      <img class="logo" src="../assets/logo.png" alt="Grafici Covid-19 Italia">
      <div class="md-title">Grafici Covid-19 Italia</div>
      <div class="md-subheading"><b>Versione:</b> 1.4.6 - <span @click="setAllCommitSha">{{commitSha}}</span></div>
      <div>
        <md-switch v-model="themeSwitch" @change="changeTheme">Tema chiaro/scuro</md-switch>
      </div>
      <p><a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19/raw/master/schede-riepilogative/regioni/dpc-covid19-ita-scheda-regioni-latest.pdf">Scarica ultimo riepilogo ufficiale [PDF]</a></p>
      <p><a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">Dati forniti dal Ministero della Salute</a></p>
      <p><a class="md-accent" target="_blank" href="https://github.com/vellons/Covid19ChartsItaly">Codice sorgente dashboard</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Info",
    data: () => ({
      supportHTML: "",
      commitSha: "",
      themeSwitch: false, // false = "default"; true = "dark"
    }),
    mounted() {
      if (localStorage.userTheme === "dark") this.themeSwitch = true
      if (process.env.VUE_APP_COMMIT_SHA) {
        this.commitSha = process.env.VUE_APP_COMMIT_SHA.substring(0, 7)
      }
    },
    methods: {
      setAllCommitSha: function () {
        if (process.env.VUE_APP_COMMIT_SHA) {
          this.commitSha = process.env.VUE_APP_COMMIT_SHA
        }
      },
      changeTheme: function () {
        if (this.themeSwitch) localStorage.userTheme = "dark"
        else localStorage.userTheme = "light"
        this.$emit("themeChanged")
      }
    }
  }
</script>

<style lang="scss">
  #info-container {
    .middle-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
    }

    .md-title {
      font-size: 200%;
      margin-bottom: 10px;
    }

    .logo {
      height: 200px;
    }
  }
</style>
