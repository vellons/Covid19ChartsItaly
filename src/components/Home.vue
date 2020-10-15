<template>
  <div class="home-container md-layout">
    <chart-tamponi class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100" :height="boxHeight"/>
    <chart-percent-positivi-tamponi class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100" :height="boxHeight"/>
  </div>
</template>

<script>
  import ChartTamponi from "@/components/charts/ChartTamponi"
  import ChartPercentPositiviTamponi from "@/components/charts/ChartPercentualePositiviNeiTamponi"

  export default {
    name: "Home",
    components: {ChartPercentPositiviTamponi, ChartTamponi},
    data: () => ({
      loading: true,
      boxHeight: "350px"
    })
  }
</script>
