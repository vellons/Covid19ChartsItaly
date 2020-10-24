<template>
  <div class="home-container md-layout">
    <chart-overall
      class="md-layout-item md-size-66 md-medium-size-100 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-andamento
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-tamponi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-percent-positivi-tamponi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-condizione-positivi
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-positivi-per-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-nuovi-positivi-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>
    <chart-tamponi-regione
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight"/>

    <div class="md-layout-item md-size-100" style="text-align: center; margin: 20px">
      <a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">
        Dati forniti dal Ministero della Salute</a><br>
      <router-link to="/info" style="color: orange">
        <div>Altre info</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import ChartOverall from "@/components/charts/ChartOverall"
  import ChartAndamento from "@/components/charts/ChartAndamento"
  import ChartTamponi from "@/components/charts/ChartTamponi"
  import ChartPercentPositiviTamponi from "@/components/charts/ChartPercentualePositiviNeiTamponi"
  import ChartCondizionePositivi from "@/components/charts/ChartCondizionePositivi"
  import ChartPositiviPerRegione from "@/components/charts/ChartPositiviPerRegione"
  import ChartNuoviPositiviRegione from "@/components/charts/ChartNuoviPositiviRegione"
  import ChartTamponiRegione from "@/components/charts/ChartTamponiRegione"

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
    },
    data: () => ({
      loading: true,
      boxHeight: "100%",
      boxMinHeight: "275px"
    })
  }
</script>
