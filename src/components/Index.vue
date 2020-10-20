<template>
  <div id="vue-js-index-container">
    <md-app md-waterfall md-mode="fixed" :md-theme="userTheme">
      <md-app-toolbar class="md-primary" md-elevation="5">
        <md-button class="md-icon-button" @click="toggleMenuExtension" v-if="!menuMaxExtension">
          <md-icon>menu</md-icon>
        </md-button>
        <router-link class="router-link" to="/home">
          <img class="bar-logo" src="../assets/logo.png" alt="Logo"/>
          <span class="md-title">Grafici Covid-19 Italia</span>
        </router-link>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuMaxExtension"> <!--md-persistent="mini"-->
        <md-toolbar class="md-transparent" md-elevation="3">
          <span>Menu</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenuExtension">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list v-if="showMenuItem">
          <div v-for="tab in menuTab" :key="tab.title">
            <router-link :to="tab.link">
              <md-list-item :class="{'active': $route.fullPath.includes(tab.link)}">
                <md-icon class="md-icon">{{tab.icon}}</md-icon>
                <span class="md-list-item-text">{{tab.title}}</span>
              </md-list-item>
            </router-link>
          </div>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view @themeChanged="themeChanged"/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data: () => ({
      menuMaxExtension: false,
      showMenuItem: false,
      userTheme: "default",
      menuTab: [
        {
          icon: "home",
          title: "Home",
          link: "/home",
        },
        {
          icon: "map",
          title: "Province",
          link: "/province",
        },
        {
          icon: "info",
          title: "Info",
          link: "/info",
        },
      ]
    }),
    mounted() {
      this.themeChanged()
      if (this.$route.fullPath === "/") {
        this.$router.replace("/home").catch(() => {
        });
      }
      this.showMenuItem = true
    },
    methods: {
      toggleMenuExtension() {
        this.menuMaxExtension = !this.menuMaxExtension
      },
      themeChanged: function () {
        if (localStorage.userTheme === "dark") this.userTheme = "dark"
        else this.userTheme = "default"
      }
    }
  }
</script>

<style lang="scss">
  @import "../../src/style/variables.scss";

  #vue-js-index-container {
    .md-app {
      height: 100vh;

      .router-link {
        display: flex;
        align-items: center;
      }

      .bar-logo {
        width: 35px !important;
      }

      .md-app-drawer {
        max-width: 300px !important;
      }

      .md-list-item {
        &:hover {
          .md-icon {
            color: $accent;
            opacity: 0.8;
          }

          .md-list-item-text {
            color: $accent;
            transition: color .4s cubic-bezier(.4, 0, .2, 1);
            opacity: 0.8;
          }
        }

        &.active {
          .md-icon {
            color: $accent;
          }

          .md-list-item-text {
            color: $accent;
          }
        }

        .md-list-item-text {
          font-weight: bold;
        }
      }
    }
  }
</style>
