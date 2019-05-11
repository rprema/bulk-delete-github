<template>
  <div class="bg-black">
    <nav class="flex items-center justify-between flex-wrap container mx-auto p-6">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-semibold text-xl">Bulk Delete Github</span>
      </div>
      <div class="w-full flex flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm flex justify-end lg:flex-grow">
          <button
            class="block mt-4 lg:inline-block lg:mt-0 text-grey-lighter hover:text-white mr-4"
            @click="onLogout()"
          >Logout</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    onLogout() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
