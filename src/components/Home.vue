<template>
  <div class="home-container md-layout">
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
  </div>
</template>

<script>
  import ChartAndamento from "@/components/charts/ChartAndamento"
  import ChartTamponi from "@/components/charts/ChartTamponi"
  import ChartPercentPositiviTamponi from "@/components/charts/ChartPercentualePositiviNeiTamponi"
  import ChartCondizionePositivi from "@/components/charts/ChartCondizionePositivi"

  export default {
    name: "Home",
    components: {ChartAndamento, ChartTamponi, ChartPercentPositiviTamponi, ChartCondizionePositivi},
    data: () => ({
      loading: true,
      boxHeight: "100%",
      boxMinHeight: "275px"
    })
  }
</script>
