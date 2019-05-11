<template>
  <div
    v-if="repos.length"
    class="flex flex-1 self-stretch md:self-auto flex-col bg-white shadow-lg rounded py-4 px-2 mx-6"
  >
    <h3 class="px-4 py-2">{{title}} ({{repos.length}})</h3>
    <div
      v-for="repo in repos"
      :key="repo.name"
      class="repo-item flex justify-between content-center rounded px-4 py-2 hover:bg-grey-lighter"
    >
      <div class="repo-info flex text-grey-darker">
        <input
          type="checkbox"
          :id="repo.name"
          :value="repo.name"
          @change="$emit('onSelectRepo', { repoName: repo.name, isChecked: $event.target.checked })"
        >
        <label :for="repo.name" class="repo-name ml-2">{{repo.name}}</label>
      </div>
      <a
        class="repo-action ml-2 no-underline"
        :href="repo.html_url"
        :title="repo.name"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 icon-link">
          <path
            class="secondary"
            d="M19.48 13.03l-.02-.03a1 1 0 1 1 1.75-.98A6 6 0 0 1 16 21h-4a6 6 0 1 1 0-12h1a1 1 0 0 1 0 2h-1a4 4 0 1 0 0 8h4a4 4 0 0 0 3.48-5.97z"
          ></path>
          <path
            class="primary"
            d="M4.52 10.97l.02.03a1 1 0 1 1-1.75.98A6 6 0 0 1 8 3h4a6 6 0 1 1 0 12h-1a1 1 0 0 1 0-2h1a4 4 0 1 0 0-8H8a4 4 0 0 0-3.48 5.97z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppRepos",
  props: ["repos", "title"],
  data() {
    return { checkedRepos: [] };
  }
};
</script>