<template>
  <div class="chart-totale-casi-per-provincia">
    <BoxContainer :height="height" :minHeight="minHeight" :title="(showTotal ? 'Totale casi': 'Casi giorno per giorno')"
                  :loading="chartLoading">
      <div style="margin: 10px">
        Ultimo aggiornamento: <b>{{lastUpdate}}</b>. Ogni giorno nuovi aggiornamenti alle <b>17:15 circa.</b><br>
        <router-link to="/home" style="color: orange">
          <span>Visualizza andamento italiano</span>
        </router-link>
      </div>
      <apexchart
        v-if="!chartLoading && provinceList.length > 0"
        type="area" :options="chartOptions" :series="chartSeries" :key="showTotal+showLast30+provinceList"/>
      <div v-if="!chartLoading && provinceList.length === 0"><br>Inserisci almeno una provincia tra l'elenco...</div>
    </BoxContainer>
  </div>
</template>

<script>
  let moment = require("moment")
  import BoxContainer from "@/components/global/BoxContainer"
  import {chartMixins} from "@/mixins/ChartMixins"

  export default {
    name: "chart-totale-casi-per-provincia",
    components: {BoxContainer},
    mixins: [chartMixins],
    props: {
      height: {default: "100%"},
      minHeight: {default: "300px"},
      showTotal: {
        type: Boolean,
        default: false
      },
      provinceList: {
        type: Array,
        default: Array
      },
      showLast30: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({
      chartLoading: true,
      chartOptions: {},
      chartSeries: [],
      provinceData: [],
      lastUpdate: "",
    }),
    mounted() {
      this.parseData()
    },
    watch: {
      showTotal: function () {
        this.parseData()
      },
      provinceList: function () {
        this.parseData()
      },
      showLast30: function () {
        this.parseData()
      }
    },
    methods: {
      downloadData: async function () {
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
        await this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            this.provinceData = response.body
          }
        }).catch(() => {
          this.$router.replace("/").catch(() => {
          });
        })
      },
      parseData: async function () {
        // Empty array
        this.chartLoading = true
        this.chartOptions = this.getChartAreaOptions("apex-chart-totale-casi-per-provincia") // Reset chart option
        this.chartSeries = []
        if (this.provinceData.length <= 1) await this.downloadData()
        if (this.provinceData.length <= 1) { // Check after download
          this.chartLoading = false
          return
        }
        if (this.provinceList.length <= 0) {
          this.chartLoading = false
          return
        }

        let last = this.provinceData[this.provinceData.length - 1]
        this.lastUpdate = moment(last.data).format("DD/MM/YYYY") + " alle " + moment(last.data).format("HH:mm")

        // Structure
        if (this.provinceList.length === 1) {
          this.chartOptions.colors = ["#ffa547"] // Custom color when only one selected
        }
        let yesterday = []
        this.provinceList.forEach((item => { // For each provincia
          yesterday.push(0)
          this.chartSeries.push({ // Create apex chart series
            name: item,
            data: []
          })
        }))

        // GitHub data for each
        this.provinceData.forEach((item => { // Scroll GitHub data
          if (this.provinceList.includes(item.denominazione_provincia)) { // Take only selected province
            if (!this.showLast30 || (moment().diff(item.data, "days") <= 30 && this.showLast30)) { // showLast30 yes/no
              let index = this.chartSeries.findIndex(x => x.name === item.denominazione_provincia) // Find index of series in chart
              if (moment().diff(item.data, "days") === 30 && this.showLast30) {
                yesterday[index] = item.totale_casi // Set offset for first of 30 days range
              } else {
                if (index === 0) this.chartOptions.xaxis.categories.push(item.data) // Insert X date apex chart
                if (this.showTotal) {
                  this.chartSeries[index].data.push(item.totale_casi)
                } else {
                  this.chartSeries[index].data.push(item.totale_casi - yesterday[index])
                  yesterday[index] = item.totale_casi
                }
              }
            }
          }
        }))
        this.chartLoading = false
      }
    }
  }
</script>
