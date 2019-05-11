<template>
  <div class="bg-grey-lighter">
    <AppHeader/>
    <AppUserInfo :user="userInfo" v-on:onDeleteRepos="onDeleteRepos"/>
    <div class="flex items-start flex-col md:flex-row justify-between container mx-auto py-8">
      <AppRepos :repos="privateRepos" title="Private Repos" v-on:onSelectRepo="onSelectRepo"/>
      <AppRepos :repos="publicRepos" title="Public Repos" v-on:onSelectRepo="onSelectRepo"/>
      <AppRepos :repos="forkedRepos" title="Forked Repos" v-on:onSelectRepo="onSelectRepo"/>
    </div>
    <AppModalDialog
      v-if="showModal"
      :content="checkedRepos"
      v-on:onProceedModal="onProceedModal"
      v-on:onCancelModal="onCancelModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import fetchRepos from "@/services/fetchRepos";
import deleteRepos from "@/services/deleteRepos";
import userInfo from "@/services/userInfo";
import AppHeader from "@/components/AppHeader.vue";
import AppUserInfo from "@/components/AppUserInfo.vue";
import AppRepos from "@/components/AppRepos.vue";
import AppModalDialog from "@/components/AppModalDialog.vue";

export default {
  name: "AppDashboard",
  components: {
    AppHeader,
    AppUserInfo,
    AppRepos,
    AppModalDialog
  },
  data() {
    return {
      username: "",
      access_token: "",
      userInfo: {},
      privateRepos: [],
      publicRepos: [],
      forkedRepos: [],
      checkedRepos: [],
      showModal: false
    };
  },
  methods: {
    getRepos() {
      fetchRepos(this.username, this.access_token).then(repos => {
        const { privateRepos, publicRepos, forkedRepos } = repos;

        this.privateRepos = privateRepos;
        this.publicRepos = publicRepos;
        this.forkedRepos = forkedRepos;
      });
    },
    getUserInfo() {
      userInfo(this.username, this.access_token).then(userInfo => {
        this.userInfo = userInfo;
      });
    },
    onDeleteRepos(event) {
      if (this.checkedRepos.length > 0) {
        this.showModal = !this.showModal;
      }
    },
    onSelectRepo(event) {
      if (event.isChecked) {
        this.checkedRepos.push(event.repoName);
      } else {
        this.checkedRepos = this.checkedRepos.filter(
          repo => repo !== event.repoName
        );
      }
    },
    onProceedModal() {
      console.log(`On Process Clicked!`);
      deleteRepos(this.checkedRepos, this.username, this.access_token).then(
        response => {
          console.log(response);
          this.showModal = !this.showModal;
        }
      );
    },
    onCancelModal() {
      this.showModal = !this.showModal;
    }
  },
  beforeMount() {
    const { username, access_token } = this.$route.params;
    this.username = username;
    this.access_token = access_token;
    this.getRepos();
    this.getUserInfo();
  },
  beforeRouteEnter(to, from, next) {
    const { username, access_token } = to.params;
    let allowRouter = !!(username && access_token);
    if (allowRouter) {
      next();
    } else {
      next("/");
    }
  }
};
</script>