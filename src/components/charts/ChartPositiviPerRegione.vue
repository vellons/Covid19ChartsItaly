<template>
  <div class="chart-positivi-per-regione">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Regioni con più attualmente positivi'"
                  :loading="chartLoading">
      <apexchart v-if="!chartLoading" type="bar" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-positivi-per-regione",
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
          name: "Attuali positivi",
          data: []
        },
        {
          name: "Nuovi positivi",
          data: []
        }
      ],
    }),
    mounted() {
      this.chartOptions = this.getChartBarOptions("apex-chart-positivi-per-regione")
      this.chartOptions.colors = ["#0040ff", "#ffa547"]
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            let regioni = response.body
            regioni = regioni.sort((a, b) => (a.totale_positivi < b.totale_positivi) ? 1 : ((b.totale_positivi < a.totale_positivi) ? -1 : 0))
            for (let i = 0; i < 8; i++) {
              this.chartOptions.xaxis.categories.push(regioni[i].denominazione_regione)
              this.chartSeries[0].data.push(regioni[i].totale_positivi - regioni[i].nuovi_positivi)
              this.chartSeries[1].data.push(regioni[i].nuovi_positivi)
            }
            this.chartLoading = false
          }
        })
      }
    }
  }
</script>
