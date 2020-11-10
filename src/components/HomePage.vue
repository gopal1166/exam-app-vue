<template>
  <div class="home-page">

    Username:
    
    <a-input class="username-box" placeholder="Enter username"  v-model="username" />

    &nbsp;
    <a-button type="primary" v-show="username" @click="onStart">
      Start exam
    </a-button>

    <br><br>
    <Report />
  </div>
</template>

<script>
import router from "../router";
import Report from './Report.vue'

export default {
  name: "HomePage",
  components: {
      Report
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {

  },
  methods: {
    onStart() {
      router.push({ name: "exam", params: { username: this.username } });
    },
    onFlavor() {
      this.$store.commit('change', 'heelo')
    }
  },
};
</script>

<style scoped>
.home-page {
  width: 1024px;
  margin: 5% auto;
}

.username-box {
    width: 30%;
    margin-right: 1rem;
}
</style>

