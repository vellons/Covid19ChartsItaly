<template>
  <div class="chart-tamponi">
    <BoxContainer :height="height" :minHeight="minHeight"
                  :title="'Totale tamponi: ' + total + ' - Persone testate: ' + totalPersonTested"
                  :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-tamponi",
    components: {BoxContainer},
    mixins: [chartMixins],
    props: {
      height: {default: "100%"},
      minHeight: {default: "300px"},
      showLast30: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      chartLoading: true,
      chartOptions: {},
      chartSeries: [
        {
          name: "Tamponi",
          data: []
        },
        {
          name: "Nuovi positivi",
          data: []
        }
      ],
      total: "",
      totalPersonTested: ""
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-tamponi")
      this.chartOptions.colors = ["#00e2e6", "#ffa547"]
      this.downloadData()
    },
    watch: {
      showLast30: function (show) {
        let temp = {...this.chartOptions}
        temp.xaxis.min = show ? new Date().setDate(new Date().getDate() - 30) : undefined
        this.chartOptions = temp
      }
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            this.total = response.body[response.body.length - 1].tamponi.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.')
            this.totalPersonTested = response.body[response.body.length - 1].casi_testati.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.')
            let yesterday = 0
            response.body.forEach((item => {
              this.chartSeries[0].data.push(item.tamponi - yesterday)
              this.chartSeries[1].data.push(item.nuovi_positivi)
              this.chartOptions.xaxis.categories.push(item.data)
              yesterday = item.tamponi
            }))
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>
