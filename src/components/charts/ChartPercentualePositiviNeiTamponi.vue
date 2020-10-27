<template>
  <div class="chart-percent-positivi-tamponi">
    <BoxContainer :height="height" :minHeight="minHeight" :title="'Percentuale di tamponi positivi'"
                  :loading="chartLoading">
      <apexchart ref="apexPositivita" v-if="!chartLoading" type="area" :options="chartOptions" :series="chartSeries"/>
    </BoxContainer>
  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import {chartMixins} from "@/mixins/ChartMixins";

  export default {
    name: "chart-percent-positivi-tamponi",
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
          name: "% Positività tamponi",
          data: []
        },
        {
          name: "% Positività persone primo test",
          data: []
        }
      ],
      total: ""
    }),
    mounted() {
      this.chartOptions = this.getChartAreaOptions("apex-chart-percent-positivi-tamponi")
      this.chartOptions.colors = ["#ffa547", "#db2a6e"]
      this.chartOptions.tooltip.y = {
        formatter: function (value) {
          return value + "%"
        }
      }
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.chartLoading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            this.total = response.body[response.body.length - 1].tamponi
            let yesterdayCasiTestati = 0
            let yesterdayTamponi = 0
            response.body.forEach((item => {
              if (!item.casi_testati) item.casi_testati = 0 // This data was added on 19/04/2020 to the dataset
              let positivi = item.nuovi_positivi
              let casiTestati = item.casi_testati - yesterdayCasiTestati
              let tamponi = item.tamponi - yesterdayTamponi
              this.chartSeries[0].data.push((positivi / tamponi * 100).toFixed(2))
              if (item.casi_testati) this.chartSeries[1].data.push((positivi / casiTestati * 100).toFixed(2))
              else this.chartSeries[1].data.push(0)
              this.chartOptions.xaxis.categories.push(item.data)
              yesterdayTamponi = item.tamponi
              yesterdayCasiTestati = item.casi_testati
            }))
            this.chartLoading = false
            setTimeout(() => {
              try {
                this.$refs.apexPositivita.toggleSeries("% Positività persone primo test")
              } catch (error) {
                console.error("Error: ", error.message)
              }
            }, 150); // Disable
          }
        })
      }
    }
  }
</script>
