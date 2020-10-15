<template>
  <div class="hello">
    <apexchart v-if="!chartLoading" width="500" type="area" :options="chartOptions" :series="chartSeries"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      chartLoading: true,
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
      },
      chartSeries: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  mounted() {
    this.downloadData()
  },
  methods: {
    downloadData: function () {
      this.chartLoading = true
      let url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json'
      this.$http.get(url).then((response) => {
        if (response.status === 200 && response.body && response.body.length > 1) {
          response.body.forEach((item => {
            this.chartSeries[0].data.push(item.tamponi)
            this.chartOptions.xaxis.categories.push(item.data)
            console.log(item)
          }))
          this.chartLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
