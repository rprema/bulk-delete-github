<template>
  <div class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex">
    <div
      class="animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col"
    >
      <h2 class="text-xl font-hairline md:leading-loose">Are you sure?</h2>
      <p class="text-md leading-normal text-grey-darker mb-4">
        The following
        <span class="font-bold text-black">{{content.length}}</span> repositories will be deleted:
      </p>
      <ul v-for="repo in content" :key="repo">
        <li class="text-grey-darker mb-2">{{repo}}</li>
      </ul>
      <div class="inline-flex justify-center mt-4">
        <button
          @click="$emit('onProceedModal')"
          class="text-sm font-semibold rounded px-6 py-2 shadow leading-normal bg-black border border-black text-white hover:bg-white hover:text-black"
        >Delete</button>
        <button
          @click="$emit('onCancelModal')"
          class="ml-4 text-red-dark focus:outline-none focus:shadow-outline"
        >Cancel</button>
      </div>
      <span @click="$emit('onCancelModal')" class="absolute pin-t pin-r pt-4 px-4">
        <svg
          class="h-8 w-8 text-grey hover:text-grey-darkest"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          ></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModalDialog",
  props: ["content"],
  data() {
    return {};
  },
  methods: {
    toggleModal() {}
  }
};
</script>