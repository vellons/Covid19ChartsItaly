<template>
  <div class="chart-percentuale-positivi-regione">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Positività tamponi per regione oggi'"
                  :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="bar" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-percentuale-positivi-regione",
    components: {BoxContainer},
    mixins: [chartMixins],
    props: {
      height: {default: "100%"},
      minHeight: {default: "300px"}
    },
    data: () => ({
      chartLoading: true,
      chartOptions: {},
      chartSeries: [
        {
          name: "Positività tamponi",
          data: []
        }
      ],
    }),
    mounted() {
      this.chartOptions = this.getChartBarOptions("apex-chart-percentuale-positivi-regione")
      this.chartOptions.colors = ["#ffa547"]
      this.chartOptions.tooltip.y = {
        formatter: function (value) {
          return value + "%"
        }
      }
      this.chartOptions.yaxis = {}
      this.chartOptions.yaxis.labels = {
        formatter: function (value) {
          return (value).toFixed(1) + "%"
        }
      }
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            let regioniAll = response.body
            let meno0Date = regioniAll[regioniAll.length - 1].data
            let meno1Date = response.body[regioniAll.length - 1 - 22].data
            let meno0Regioni = []
            let meno1Regioni = []
            regioniAll.forEach((item => { // Get today and day before data
              if (item.data === meno0Date) meno0Regioni.push(item)
              else if (item.data === meno1Date) meno1Regioni.push(item)
            }))

            let difference = []
            meno0Regioni.forEach((item => {
              let d = {}
              let meno1Data = meno1Regioni.find(x => x.codice_regione === item.codice_regione)
              d.codice_regione = item.codice_regione
              d.denominazione_regione = item.denominazione_regione
              d.nuovi_positivi = item.nuovi_positivi
              d.diff_tamponi = item.tamponi - meno1Data.tamponi
              d.percentuale = +(d.nuovi_positivi / d.diff_tamponi * 100).toFixed(2)
              difference.push(d)
            }))
            difference = difference.sort((a, b) => (a.percentuale < b.percentuale) ? 1 : ((b.percentuale < a.percentuale) ? -1 : 0))

            for (let i = 0; i < 8; i++) {
              this.chartOptions.xaxis.categories.push(difference[i].denominazione_regione)
              this.chartSeries[0].data.push(difference[i].percentuale)
            }
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>
