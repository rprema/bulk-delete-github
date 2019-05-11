<template>
  <div class="flex flex-col items-center justify-center flex-wrap h-full">
    <div class="flex flex-col content-center flex-wrap w-full max-w-sm">
      <h1
        class="text-base text-center sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mb-6"
      >Bulk Delete Github</h1>

      <form class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >Github Username</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            v-model="username"
            type="text"
            placeholder="Github Username"
            :class="checkError('username') ? 'border-red': ''"
          >
          <p v-if="checkError('username')" class="text-red text-xs itapc">Please enter the username.</p>
        </div>
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="access_token"
          >Github Access Token</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="access_token"
            v-model="access_token"
            type="password"
            placeholder="******************"
            autocomplete="off"
            :class="checkError('access_token_empty') ? 'border-red': ''"
          >
          <p
            v-if="checkError('access_token_empty')"
            class="text-red text-xs itapc"
          >Please enter the access token.</p>
          <p
            v-if="checkError('access_token_invalid')"
            class="text-red text-xs itapc"
          >Please enter a valid access token.</p>
          <p
            v-if="checkError('access_token_scope')"
            class="text-red text-xs itapc"
          >Please enter a token with repo, delete_repo scope.</p>
        </div>
        <div class="flex flex-col">
          <button
            class="bg-black hover:bg-white text-white hover:text-black border border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="onSubmitLoginForm()"
          >Login</button>
          <div class="flex flex-col mt-6">
            <a
              class="inline-block align-baseline text-sm text-blue hover:underline"
              href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/"
              rel="noopener noreferrer"
              target="_blank"
            >Get the Access Token from Github</a>
            <p class="text-grey-darker text-xs mt-1">
              (Token with
              <span class="font-bold">repo, delete_repo</span> scope required.)
            </p>
          </div>
        </div>
      </form>
      <div class="text-center text-grey text-xs mt-4">
        <p>
          Made by
          <a
            class="text-blue hover:underline"
            href="https://ratnaprema.com/"
            rel="noopener noreferrer"
            target="_blank"
          >Ratna Prema.</a> Available on
          <a
            class="text-blue hover:underline"
            href="http://github.com/rprema/bulk-delete-github"
            rel="noopener noreferrer"
            target="_blank"
          >Github</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import userAuth from "@/services/userAuth";

export default {
  name: "AppLogin",
  data() {
    return {
      username: "",
      access_token: "",
      loginErrors: []
    };
  },
  methods: {
    checkError(errorName) {
      return this.loginErrors.indexOf(errorName) >= 0;
    },
    async onSubmitLoginForm() {
      this.loginErrors = [];

      if (!this.username) {
        this.loginErrors.push("username");
      }
      if (!this.access_token) {
        this.loginErrors.push("access_token_empty");
      }

      if (this.loginErrors.length > 0) {
        return;
      }

      userAuth(this.username, this.access_token).then(auth => {
        if (!auth.isAuthorized) {
          this.loginErrors.push("access_token_invalid");
          return;
        }
        if (!auth.hasDeleteScope) {
          this.loginErrors.push("access_token_scope");
          return;
        }

        // Navigate to the repos page.
        this.$router.push({
          name: "dashboard",
          params: { username: this.username, access_token: this.access_token }
        });
      });
    }
  }
};
</script>
