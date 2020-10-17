<template>
  <div class="home-container md-layout">
    <chart-overall class="md-layout-item md-size-66 md-medium-size-100 md-small-size-100"
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

    <div class="md-layout-item md-size-100" style="text-align: center; margin-top: 20px">
      <a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">Dati forniti dal Ministero della Salute</a><br>
      <router-link to="/info">
        <div style="color: orange">Altre info</div>
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

  export default {
    name: "Home",
    components: {ChartOverall, ChartAndamento, ChartTamponi, ChartPercentPositiviTamponi, ChartCondizionePositivi},
    data: () => ({
      loading: true,
      boxHeight: "100%",
      boxMinHeight: "275px"
    })
  }
</script>
