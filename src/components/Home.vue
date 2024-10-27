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
