<template>
  <div id="info-container">
    <div class="middle-center">
      <img class="logo" src="../assets/logo.png" alt="Grafici Covid-19 ITA">
      <div class="md-title">Grafici Covid-19 ITA</div>
      <div class="md-subheading"><b>Versione:</b> 1.0.2 - <span @click="setAllCommitSha">{{commitSha}}</span>
      </div>
      <div class="md-subheading"><b>Ultimo aggiornamento dati:</b> {{lastUpdate}}</div>
      <div>
        <md-switch v-model="themeSwitch" @change="changeTheme">Tema chiaro/scuro</md-switch>
      </div>
      <p><a class="md-accent" target="_blank" href="https://github.com/vellons">Dashboard GitHub code</a></p>
      <p><a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">Fonte dati</a></p>
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
      lastUpdate: "..."
    }),
    mounted() {
      if (localStorage.userTheme === "dark") this.themeSwitch = true
      if (process.env.VUE_APP_COMMIT_SHA) {
        this.commitSha = process.env.VUE_APP_COMMIT_SHA.substring(0, 7)
      }
      this.downloadData()
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
      },
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length >= 1) {
            this.lastUpdate = response.body[response.body.length - 1].data
          }
        })
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
      margin-bottom: 30px;
    }

    .logo {
      height: 200px;
    }

    .info-container {
      margin-bottom: 50px;
    }
  }
</style>
