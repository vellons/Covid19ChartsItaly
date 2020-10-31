<template>
  <div class="home-container md-layout">

    <BoxContainer
      class="md-layout-item md-size-40 md-medium-size-25 md-small-size-100"
      :height="boxHeight" :minHeight="boxMinHeight" :title="'Filtri'">
      <div style="margin: 15px">
        <div>
          <md-switch v-model="showTotal" @change="showTotalChanged">Mostra giornaliero/totale</md-switch>
        </div>
        <div>
          <md-switch v-model="showLast30" @change="showLast30Changed">Mostra solo ultimi 30 giorni</md-switch>
        </div>
        <md-field>
          <label>Elenco province</label>
          <md-select v-model="provinceList" md-dense multiple @input="provinceListChanged">
            <md-option v-for="p in province" :value="p" :key="p">{{p}}</md-option>
          </md-select>
        </md-field>
        <div v-if="provinceList.length >= 2"><br>Considera che le province hanno un numero differente di abitanti e di
          conseguenza un numero non comparabile di positivi.
        </div>
      </div>
    </BoxContainer>

    <chart-totale-casi-per-provincia
      class="md-layout-item md-size-60 md-medium-size-75 md-small-size-100"
      v-if="!loading"
      :height="boxHeight" :minHeight="boxMinHeight"
      :showTotal="showTotal" :provinceList="provinceList" :showLast30="showLast30"/>

    <div class="md-layout-item md-size-100" style="text-align: center; margin: 20px;">
      <a class="md-accent" target="_blank" href="https://github.com/pcm-dpc/COVID-19">
        Dati forniti dal Ministero della Salute</a><br>
      <router-link to="/info" style="color: orange">
        <div>Altre info</div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import BoxContainer from "@/components/global/BoxContainer";
  import ChartTotaleCasiPerProvincia from "@/components/charts/ChartTotaleCasiPerProvincia";

  export default {
    name: "Provincia",
    components: {
      BoxContainer,
      ChartTotaleCasiPerProvincia
    },
    data: () => ({
      loading: true,
      boxHeight: "100%",
      boxMinHeight: "275px",
      showTotal: true,
      showLast30: false,
      provinceList: [],
      province: ["Agrigento", "Alessandria", "Ancona", "Aosta", "Aquila", "Arezzo", "Ascoli Piceno", "Asti", "Avellino", "Bari", "Barletta-Andria-Trani", "Belluno", "Benevento", "Bergamo", "Biella", "Bologna", "Bolzano", "Brescia", "Brindisi", "Cagliari", "Caltanissetta", "Campobasso", "Caserta", "Catania", "Catanzaro", "Chieti", "Como", "Cosenza", "Cremona", "Crotone", "Cuneo", "Enna", "Fermo", "Ferrara", "Firenze", "Foggia", "Forlì-Cesena", "Frosinone", "Genova", "Gorizia", "Grosseto", "Imperia", "Isernia", "La Spezia", "Latina", "Lecce", "Lecco", "Livorno", "Lodi", "Lucca", "Macerata", "Mantova", "Massa Carrara", "Matera", "Messina", "Milano", "Modena", "Monza e della Brianza", "Napoli", "Novara", "Nuoro", "Oristano", "Padova", "Palermo", "Parma", "Pavia", "Perugia", "Pesaro e Urbino", "Pescara", "Piacenza", "Pisa", "Pistoia", "Pordenone", "Potenza", "Prato", "Ragusa", "Ravenna", "Reggio di Calabria", "Reggio nell Emilia", "Rieti", "Rimini", "Roma", "Rovigo", "Salerno", "Sassari", "Savona", "Siena", "Siracusa", "Sondrio", "Sud Sardegna", "Taranto", "Teramo", "Terni", "Torino", "Trapani", "Trento", "Treviso", "Trieste", "Udine", "Varese", "Venezia", "Verbano-Cusio-Ossola", "Vercelli", "Verona", "Vibo Valentia", "Vicenza", "Viterbo"]
    }),
    mounted() {
      this.loading = true
      this.showTotal = localStorage.showTotal === "true"
      this.showLast30 = localStorage.showLast30 === "true"
      this.provinceList = []
      if (localStorage.lastProvincia) this.provinceList.push(localStorage.lastProvincia)
      this.loading = false
    },
    methods: {
      showTotalChanged: function () {
        localStorage.showTotal = this.showTotal
      },
      showLast30Changed: function () {
        localStorage.showLast30 = this.showLast30
      },
      provinceListChanged: function () {
        if (this.provinceList.length >= 1) localStorage.lastProvincia = this.provinceList[0]
      }
    }
  }
</script>
