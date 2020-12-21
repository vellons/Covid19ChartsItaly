<template>
  <div class="home-container md-layout">
    <chart-overall
      class="md-layout-item md-size-66 md-medium-size-100 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-andamento
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight" :showLast30="showLast30Dashboard"/>
    <chart-tamponi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight" :showLast30="showLast30Dashboard"/>
    <chart-percent-positivi-tamponi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight" :showLast30="showLast30Dashboard"/>
    <chart-condizione-positivi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight" :showLast30="showLast30Dashboard"/>
    <chart-positivi-per-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-percentuale-positivi-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-tamponi-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-nuovi-positivi-regione
      class="md-layout-item md-medium-size-50 md-small-size-100 only-mobile"
      :height="boxHeight" :minHeight="boxMinHeight"/>

    <div class="md-layout-item md-size-100" style="text-align: center; margin: 20px">

      <div style="margin: 5px">
        <md-switch v-model="showLast30Dashboard" @change="showLast30DashboardChanged">
          Mostra solo ultimi 30 giorni nei grafici
        </md-switch>
      </div>

      <a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">
        Dati forniti dal Ministero della Salute</a><br>
      <router-link to="/info" style="color: orange">
        <div>Altre info</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import ChartOverall from "@/components/charts/ChartOverall";
  import ChartAndamento from "@/components/charts/ChartAndamento";
  import ChartTamponi from "@/components/charts/ChartTamponi";
  import ChartPercentPositiviTamponi from "@/components/charts/ChartPercentualePositiviNeiTamponi";
  import ChartCondizionePositivi from "@/components/charts/ChartCondizionePositivi";
  import ChartPositiviPerRegione from "@/components/charts/ChartPositiviPerRegione";
  import ChartNuoviPositiviRegione from "@/components/charts/ChartNuoviPositiviRegione";
  import ChartTamponiRegione from "@/components/charts/ChartTamponiRegione";
  import ChartPercentualePositiviRegione from "@/components/charts/ChartPercentualePositiviPerRegione";

  export default {
    name: "Home",
    components: {
      ChartOverall,
      ChartAndamento,
      ChartTamponi,
      ChartPercentPositiviTamponi,
      ChartCondizionePositivi,
      ChartPositiviPerRegione,
      ChartNuoviPositiviRegione,
      ChartTamponiRegione,
      ChartPercentualePositiviRegione,
    },
    data: () => ({
      loading: true,
      boxHeight: "100%",
      boxMinHeight: "275px",
      showLast30Dashboard: false
    }),
    mounted() {
      this.showLast30Dashboard = localStorage.showLast30Dashboard === "true"
    },
    methods: {
      showLast30DashboardChanged: function () {
        localStorage.showLast30Dashboard = this.showLast30Dashboard
      }
    }
  }
</script>

<style lang="scss">
  .home-container {
    .only-mobile {
      @media only screen and (min-width: 1279px) {
        display: none;
      }
    }
  }
</style>
