<template>
  <div class="flex items-start flex-col md:flex-row container mx-auto mt-6">
    <div class="flex flex-grow self-stretch md:self-auto flex-col px-6">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex sm:items-center flex-grow">
          <img
            class="block h-8 sm:h-10 rounded-full border mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
            :src="user.avatar_url"
            alt
          >
          <div class="text-center sm:text-left sm:flex-grow">
            <p class="text-md font-bold leading-tight">{{user.name}}</p>
            <p class="text-sm leading-tight text-grey-dark">{{user.login}}</p>
          </div>
        </div>
        <div>
          <button
            class="text-sm font-semibold rounded px-6 py-2 shadow leading-normal bg-black border border-black text-white hover:bg-white hover:text-black"
            @click="$emit('onDeleteRepos')"
          >Delete Selected Repos</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppUserInfo",
  props: ["user"],
  data() {
    return {};
  }
};
</script>