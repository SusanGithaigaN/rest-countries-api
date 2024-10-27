<script>
export default {
  data() {
    return {
      searchQuery: "",
      countryData: null,
      tld: [],
      nativeName: "",
    };
  },
  methods: {
    async searchCountry() {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,name.nativeName,borders`
        );
        if (!response.ok) throw new Error("Country not found");
        this.countryData = await response.json();
        this.countryData = this.countryData[0];
        // native name
        const nativeNames = this.countryData.name.nativeName;
        this.nativeName = nativeNames ? Object.values(nativeNames)[0].common : "N/A";
      } catch (error) {
        console.error(error);
        this.countryData = null;
        this.nativeName = "N/A";
      }
    },
  },
};
</script>

<template>
  <!-- <div class="container bg-white dark:bg-very-dark-blue px-4"> -->
  <div
    class="flex flex-row justify-between gap-8 pt-4 px-6 bg-white dark:bg-very-dark-blue"
  >
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
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="searchCountry"
        class="text-sm md:text-md lg:text-md px-2 bg-transparent border-none outline-none w-full"
        placeholder="Search for a country..."
      />
    </div>
    <!-- filter -->
    <div
      class="inline-flex bg-white dark:bg-dark-blue text-dark-gray dark:text-white-text h-12 py-4 px-4 pr-4 md:pr-8 lg:pr-8 max-w-full text-sm md:text-md lg:text-md rounded-md shadow-2xl truncate whitespace-nowrap"
    >
      Filter by Region
    </div>
  </div>
  <!-- search results -->
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 px-4 dark:text-white-text bg-white dark:bg-very-dark-blue"
  >
    <div
      v-if="countryData"
      class="bg-white dark:bg-dark-blue mb-6 rounded-md shadow-2xl h-full pb-10"
    >
      <img
        class="img-fluid w-full h-1/2 object-cover rounded-t-md shadow-t-2xl"
        alt="flag"
        :src="countryData.flags.svg"
      />
      <div class="px-4">
        <p class="text-md text-left py-4 font-bold">{{ countryData.name.official }}</p>
        <p class="py-1.5">
          <span class="font-bold">Native name: </span>
          <span class="text-dark-gray font-semibold">{{ nativeName }}</span>
        </p>
        <p class="py-1.5">
          <span class="font-bold">Population: </span>
          <span class="text-dark-gray font-semibold">{{ countryData.population }}</span>
        </p>
        <p class="py-1.5">
          <span class="font-bold">Region: </span>
          <span class="text-dark-gray font-semibold">{{ countryData.region }}</span>
        </p>
        <p class="py-1.5">
          <span class="font-bold">Sub Region: </span>
          <span class="text-dark-gray font-semibold">{{ countryData.subregion }}</span>
        </p>
        <p class="py-1.5">
          <span class="font-bold">Capital: </span>
          <span
            v-for="(city, index) in countryData.capital"
            :key="index"
            class="text-dark-gray font-semibold"
          >
            {{ city }}<span v-if="index < countryData.capital.length - 1">, </span>
          </span>
        </p>
      </div>
      <!-- second section -->
      <!-- API res refs -->
      <!-- currency names with symbols res "currencies": { "UGX": { "name": "Ugandan shilling",
      "symbol": "Sh" } }, -->
      <div class="px-4 py-4">
        <p class="py-1.5">
          <span class="font-bold capitalize">Top Level Domain: </span>
          <span class="text-dark-gray font-semibold">{{ countryData.tld[0] }}</span>
        </p>
        <p class="py-1.5">
          <span class="font-bold capitalize">Currencies: </span>
          <span class="text-dark-gray font-semibold">
            <span v-for="(currency, code) in countryData.currencies" :key="code">
              {{ currency.name }} ({{ currency.symbol }})
            </span>
          </span>
        </p>
        <!-- langauges: "languages": { "eng": "English", "swa": "Swahili" }, -->
        <p class="py-1.5">
          <span class="font-bold">Languages: </span>
          <span class="text-dark-gray font-semibold">
            <!-- separate languages by , -->
            {{ Object.values(countryData.languages).join(", ") }}
          </span>
        </p>
      </div>
      <!-- borders res -->
      <!-- "borders": [ "ETH", "SOM", "SSD", "TZA", "UGA" ], -->
      <div class="px-4 py-4">
        <p class="py-1.5">
          <span class="font-bold">Borders: </span>
          <span class="text-dark-gray font-semibold">
            {{ Object.values(countryData.borders).join(", ") }}
          </span>
        </p>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style scoped></style>
