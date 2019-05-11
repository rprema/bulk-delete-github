<template>
  <div id="app" class="bg-grey-lighter h-full font-sans">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>