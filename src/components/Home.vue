<script>
export default {
  data() {
    return {
      post: {},
      country: {},
    };
  },
  methods: {
    getCountry() {
      fetch(
        "https://restcountries.com/v3.1/independent?status=true&fields=flags,name,population,region,capital"
      )
        .then((response) => response.json())
        .then((data) => (this.country = data));
    },
  },
  mounted() {
    this.getCountry();
  },
};
</script>

<template>
  <div class="bg-white dark:bg-very-dark-blue py-4 px-6">
    <div class="flex flex-row justify-between gap-8 pt-4">
      <!-- search box -->
      <div
        class="inline-flex bg-white dark:bg-dark-blue text-dark-gray dark:text-white-text h-12 py-4 px-4 pr-4 md:pr-20 lg:pr-28 max-w-full rounded-md shadow-2xl truncate whitespace-nowrap"
      >
        <svg
          class="w-4 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <p class="text-sm md:text-md lg:text-md px-2">Search for a country...</p>
      </div>

      <!-- filter -->
      <div
        class="inline-flex bg-white dark:bg-dark-blue text-dark-gray dark:text-white-text h-12 py-4 px-4 pr-4 md:pr-8 lg:pr-8 max-w-full text-sm md:text-md lg:text-md rounded-md shadow-2xl truncate whitespace-nowrap"
      >
        Filter by Region
      </div>
    </div>
    <!-- countries -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 dark:text-white-text"
    >
      <div
        v-for="c in country"
        :key="c.id"
        class="bg-white dark:bg-dark-blue mb-6 rounded-md shadow-2xl"
      >
        <img
          class="img-fluid w-full h-1/2 object-cover rounded-t-md shadow-t-2xl"
          alt="flag"
          :src="c.flags.svg"
        />
        <div class="px-4">
          <p class="text-md text-left py-4 font-bold">{{ c.name.official }}</p>
          <p>
            <span class="font-bold">Population: </span>
            <span class="text-dark-gray font-semibold">{{ c.population }}</span>
          </p>
          <p>
            <span class="font-bold">Region: </span>
            <span class="text-dark-gray font-semibold">{{ c.region }}</span>
          </p>
          <p>
            <span class="font-bold">Capital: </span>
            <span
              v-for="(city, index) in c.capital"
              :key="index"
              class="text-dark-gray font-semibold"
            >
              {{ city }}<span v-if="index < c.capital.length - 1">, </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
