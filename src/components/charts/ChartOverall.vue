<template>
  <div class="chart-overall">
    <div class="overall-container">
      <div class="md-layout" v-if="!loading">

        <div class="md-layout-item md-size-100 card-container">
          <div class="covid-card-lite md-elevation-5">
            Ultimo aggiornamento: <span style="font-size: 120%"><b>{{lastUpdate}}</b></span>.
            Ogni giorno nuovi aggiornamenti alle <b>17:15 circa.</b><br>
            <router-link to="/province" style="color: orange">
              <span>Visualizza andamento tra le province</span>
            </router-link>
          </div>
        </div>

        <div v-for="card in covidCards" :key="card.title"
             class="md-layout-item md-size-33 md-medium-size-50 md-small-size-100 card-container">
          <div class="covid-card md-elevation-5">
            <div class="left">
              <div class="top">
                <div class="title">{{card.title}}</div>
                <div class="info">
                  <md-icon class="md-icon info-icon">info</md-icon>
                  <md-tooltip md-direction="top">{{card.tooltip}}</md-tooltip>
                </div>
              </div>
              <div class="explained">
                <div class="number">{{card.number}}</div>
                <div class="difference">{{card.difference}}</div>
              </div>
            </div>
            <div class="right">
              <div class="percentage zero" v-if="card.percentage == 0">{{card.percentage}}%</div>
              <div class="percentage yes" v-else-if="card.percentage < 0">{{card.percentage}}%</div>
              <div class="percentage no" v-else-if="card.percentage > 0">{{card.percentage}}%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  let moment = require("moment")
  export default {
    name: "chart-overall",
    props: {
      height: {default: "100%"},
      minHeight: {default: "50px"}
    },
    data: () => ({
      loading: true,
      covidCards: [],
      lastUpdate: "",
    }),
    mounted() {
      this.downloadData()
    },
    methods: {
      downloadData: function () {
        this.loading = true
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
        this.$http.get(url).then((response) => {
          if (response.status === 200 && response.body && response.body.length > 1) {
            let meno2 = response.body[response.body.length - 3]
            let meno1 = response.body[response.body.length - 2]
            let meno0 = response.body[response.body.length - 1]
            this.lastUpdate = moment(meno0.data).format("DD/MM/YYYY") + " alle " + moment(meno0.data).format("HH:mm")
            this.covidCards = [
              {
                "title": "Nuovi positivi oggi",
                "number": meno0.nuovi_positivi.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus(meno0.nuovi_positivi - meno1.nuovi_positivi),
                "percentage": this.toStringPlus((meno0.nuovi_positivi - meno1.nuovi_positivi) / meno1.nuovi_positivi * 100, 1),
                "tooltip": "Nuovi positivi al Covid-19 oggi. Ieri erano " + (meno1.nuovi_positivi)
              },
              {
                "title": "Positività tamponi oggi",
                "number": "Ieri: " + (meno1.nuovi_positivi / (meno1.tamponi - meno2.tamponi) * 100).toFixed(2) + "%",
                "difference": "Tamponi oggi: " + (meno0.tamponi - meno1.tamponi).toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "percentage": (meno0.nuovi_positivi / (meno0.tamponi - meno1.tamponi) * 100).toFixed(2),
                "tooltip": "Percentuale di tamponi positivi al test oggi = NuoviPositiviOggi/TamponiOggi*100 --> " + meno0.nuovi_positivi + "/" + (meno0.tamponi - meno1.tamponi) + "*100"
              },
              {
                "title": "Positività persone oggi",
                "number": "Ieri: " + (meno1.nuovi_positivi / (meno1.casi_testati - meno2.casi_testati) * 100).toFixed(2) + "%",
                "difference":"Persone primo test: " + (meno0.casi_testati - meno1.casi_testati).toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "percentage": (meno0.nuovi_positivi / (meno0.casi_testati - meno1.casi_testati) * 100).toFixed(2),
                "tooltip": "Percentuale di persone che sono risultate positive al primo test oggi = NuoviPositiviOggi/CasiTestatiOggi*100 --> " + meno0.nuovi_positivi + "/" + (meno0.casi_testati - meno1.casi_testati) + "*100"
              },
              {
                "title": "Ricoveri oggi",
                "number": (meno0.ricoverati_con_sintomi - meno1.ricoverati_con_sintomi).toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus((meno0.ricoverati_con_sintomi - meno1.ricoverati_con_sintomi) - (meno1.ricoverati_con_sintomi - meno2.ricoverati_con_sintomi)),
                "percentage": this.toStringPlus(((meno0.ricoverati_con_sintomi - meno1.ricoverati_con_sintomi) - (meno1.ricoverati_con_sintomi - meno2.ricoverati_con_sintomi)) / (meno1.ricoverati_con_sintomi - meno2.ricoverati_con_sintomi) * 100, 1),
                "tooltip": "Persone che sono state ricoverate oggi con sintomi. Ieri erano " + (meno1.ricoverati_con_sintomi - meno2.ricoverati_con_sintomi) + ". (Terapie intensive escluse)"
              },
              {
                "title": "Terapia intensiva oggi",
                "number": (meno0.terapia_intensiva - meno1.terapia_intensiva).toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus((meno0.terapia_intensiva - meno1.terapia_intensiva) - (meno1.terapia_intensiva - meno2.terapia_intensiva)),
                "percentage": this.toStringPlus(((meno0.terapia_intensiva - meno1.terapia_intensiva) - (meno1.terapia_intensiva - meno2.terapia_intensiva)) / (meno1.terapia_intensiva - meno2.terapia_intensiva) * 100, 1),
                "tooltip": "Persone che sono state ricoverate oggi in terapia intensiva. Ieri erano " + (meno1.terapia_intensiva - meno2.terapia_intensiva)
              },
              {
                "title": "Decessi oggi",
                "number": (meno0.deceduti - meno1.deceduti).toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus((meno0.deceduti - meno1.deceduti) - (meno1.deceduti - meno2.deceduti)),
                "percentage": this.toStringPlus(((meno0.deceduti - meno1.deceduti) - (meno1.deceduti - meno2.deceduti)) / (meno1.deceduti - meno2.deceduti) * 100, 1),
                "tooltip": "Decessi per Covid-19 avvenuti oggi. Ieri erano " + (meno1.deceduti - meno2.deceduti)
              },
              {
                "title": "Attuali positivi",
                "number": meno0.totale_positivi.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus(meno0.totale_positivi - meno1.totale_positivi),
                "percentage": this.toStringPlus((meno0.totale_positivi - meno1.totale_positivi) / (meno1.totale_positivi) * 100, 1),
                "tooltip": "Totale delle persone attualmente positive. Ieri erano " + meno1.totale_positivi
              },
              {
                "title": "Dimessi / Guariti",
                "number": meno0.dimessi_guariti.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus(meno0.dimessi_guariti - meno1.dimessi_guariti),
                "percentage": this.toStringPlus((meno0.dimessi_guariti - meno1.dimessi_guariti) / (meno1.dimessi_guariti) * 100, 1),
                "tooltip": "Totale delle persone che sono state dimesse o sono guarite restando in isolamento domiciliale. Ieri erano " + meno1.dimessi_guariti
              },
              {
                "title": "Deceduti",
                "number": meno0.deceduti.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus(meno0.deceduti - meno1.deceduti),
                "percentage": this.toStringPlus((meno0.deceduti - meno1.deceduti) / (meno1.deceduti) * 100, 1),
                "tooltip": "Totale delle persone decedute. Ieri erano " + meno1.deceduti
              },
              /*{
                "title": "Totale casi",
                "number": meno0.totale_casi.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.'),
                "difference": this.toStringPlus(meno0.nuovi_positivi),
                "percentage": this.toStringPlus((meno0.totale_casi - meno1.totale_casi) / (meno1.totale_casi) * 100, 1),
                "tooltip": "Totale delle persone che sono risultate positive al Covid-19. Ieri era " + meno1.totale_casi
              }*/
            ]
            this.loading = false
          }
        })
      },
      toStringPlus: function (x, fixed = 0) {
        x = x.toFixed(fixed)
        if (x < 0.0099 && x >= 0) x = 0
        if (x === 0) return x.toString()
        if (x < 0) return x.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.')
        if (x > 0) return "+" + x.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.')
      }
    }
  }
</script>

<style lang="scss">
  .chart-overall {

    .overall-container {
      height: 100%;

      .card-container {
        padding: 8px;

        @media only screen and (max-width: 959px) {
          padding: 8px 0;
        }

        .covid-card-lite {
          border: 1px solid #bbbbbb;
          border-radius: 10px;
          padding: 5px 15px;
          min-width: 180px;
        }

        .covid-card {
          border: 1px solid #bbbbbb;
          border-radius: 10px;
          padding: 5px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 80px;
          max-height: 120px;
          min-width: 180px;

          .left {
            display: flex;
            flex-direction: column;

            .top {
              display: flex;
              align-items: center;
              margin-bottom: 5px;

              .title {
                font-weight: bold;
                font-size: 120%;
                max-width: 95%;
                height: 20px;
                overflow: hidden;
              }

              .info {
                margin-left: 3px;

                .info-icon {
                  width: 18px;
                  min-width: 18px;
                  height: 18px;
                  font-size: 16px !important;
                }
              }
            }

            .explained {
              display: flex;
              align-items: center;

              .number {
                margin-right: 5px;
                font-weight: bold;
              }

              .difference {
                &::before {
                  content: "(";
                }

                &::after {
                  content: ")";
                }
              }
            }
          }

          .right {
            .percentage {
              font-weight: bold;
              font-size: 150%;

              &.zero {
                color: #0040ff;
              }

              &.yes {
                color: #228b22;
              }

              &.no {
                color: #e60000;
              }
            }
          }
        }
      }
    }
  }
</style>
