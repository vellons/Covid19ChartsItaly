<template>
  <div class="home-container">
    <chart-tamponi class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100" :height="boxHeight"/>
  </div>
</template>

<script>
  import ChartTamponi from "@/components/charts/ChartTamponi";
  export default {
    name: "Home",
    components: {ChartTamponi},
    data: () => ({
      loading: true,
      boxHeight: "350px"
    })
  }
</script>
