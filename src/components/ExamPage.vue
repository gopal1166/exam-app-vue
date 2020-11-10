<template>
  <div class="exam-page">
    Welcome: &nbsp; {{ username }} <br /><br />

    <a-row v-show="questions.length > 0">
      <a-col :span="24">
        <p>
          {{ questions[quesIndex].no }} &nbsp;
          {{ questions[quesIndex].question }}
        </p>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <div v-for="item in questions[quesIndex].options" :key="item.key">
          <input
            name="myfield"
            type="radio"
            :value="item.key"
            v-model="selectedAns[quesIndex + 1]"
          />

          &nbsp; &nbsp;<label>{{ item.value }}</label>
        </div>
      </a-col>
      <a-col :span="12"> </a-col>
    </a-row>

    <br />
    <a-row>
      <a-col :span="12">
        <a-button type="primary" @click="prevBtn" v-if="quesIndex !== 0"
          >prev</a-button
        >
        &nbsp;<a-button
          type="primary"
          @click="nextBtn"
          v-if="quesIndex !== this.questions.length - 1"
        >
          next
        </a-button>
      </a-col>

      <a-col :span="12">
        &nbsp;<a-button type="primary" v-if="isAllAnsSelected" @click="onSubmit"
          >Submit</a-button
        >
      </a-col>
    </a-row>

    <br /><br /><br />

    <a-modal v-model="visible" title="Marks summery" @ok="handleOk">
      no of questions answered correctly : {{ correctAnswers }} <br />
      wrong answers: {{ wrongAnswers }} <br />
      marks archived: {{ marksAchieved }}
    </a-modal>

  </div>
</template>

<script>
/**
 * 
 * Exam page having quesitons and navigation buttons
 */
import router from "../router";

export default {
  name: "ExamPage",
  props: ["username"],
  data() {
    return {
      visible: false,
      selected: {
        1: "",
        2: "",
      },
      quesIndex: 0,
      selectedAns: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
      },
      correctAnswers: 0,
      wrongAnswers: 0,
      marksAchieved: 0,
    };
  },

  methods: {
    onCheck(event) {
      this.selectedAns[this.quesIndex + 1] = event.target.value;
    },

    nextBtn() {
      this.quesIndex = this.quesIndex + 1;
    },

    prevBtn() {
      this.quesIndex = this.quesIndex - 1;
    },

    handleOk() {
      router.push("/");
    },

    /**
     * @summary calculations of correct, wrong answers, marks achived
     * and updating the store with username and marks archived
     */
    onSubmit() {
      const array1 = Object.values(this.getCorrectAns);
      const array2 = Object.values(this.selectedAns);

      let wrongAnsList = [];
      for (let index = 0; index < array1.length; index++) {
        if (array1[index] !== array2[index]) {
          wrongAnsList.push(array1[index]);
        }
      }

      if (wrongAnsList.length === 0) {
        // all correct

        this.correctAnswers = this.totalMarks;
        this.wrongAnswers = 0;
        this.marksAchieved = this.totalMarks;
      } else if (wrongAnsList.length === this.totalMarks) {
        // all wrong

        this.wrongAnswers = wrongAnsList.length;
        this.correctAnswers = 0;
        this.marksAchieved = 0 - wrongAnsList.length * 0.5;
      } else {
        const correctAnsCount =
          this.questions.length - wrongAnsList.length;

        this.correctAnswers = correctAnsCount;
        this.wrongAnswers = wrongAnsList.length;
        this.marksAchieved = correctAnsCount - wrongAnsList.length * 0.5;
      }

      /** Updating username and marks in Vuex store */
      if (
        this.reportData &&
        this.username in this.reportData
      ) {
        let userMarks = this.reportData[this.username];
        let newMarks = userMarks + ", " + this.marksAchieved;
        this.$store.commit("setReportData", {
          username: this.username,
          marks: newMarks,
        });
      } else {
        this.$store.commit("setReportData", {
          username: this.username,
          marks: this.marksAchieved,
        });
      }

      this.visible = true;
    },
  },

  computed: {
    isAllAnsSelected() {
      const selectedAnsList = Object.values(this.selectedAns).filter(
        (ele) => ele
      );

      return this.$store.getters.getQuestions.length == selectedAnsList.length;
    },

    totalMarks() {
      return this.$store.getters.getQuestions.length;
    },

    questions() {
      return this.$store.getters.getQuestions;
    },

    getCorrectAns() {
      return this.$store.getters.getCorrectAns
    },

    reportData() {
      return this.$store.getters.reportData
    }
  },
};
</script>

<style scoped>
.exam-page {
  width: 1024px;
  margin: 5% auto;
}
</style>