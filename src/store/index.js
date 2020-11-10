import Vue from "vue";
import Vuex from "vuex";
import questions from './questions'

Vue.use(Vuex);

/**
 * 
 * Storing questions, correct ans, report data
 */
const store = new Vuex.Store({
  state: {
    reportData: {},
    count: 0,
    flavor: "",
    questions:questions, 
    correctAns: {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "A"
      },
  },
  getters: {
    reportData: (state) => {
      Vue.delete(state.reportData, "__ob__");
      Vue.delete(state.reportData, "__proto__");
      return state.reportData;
    },

    getQuestions(state) {
        return Array.from(state.questions)
    },

    getCorrectAns(state) {
        console.log("ca:", state.correctAns);
        return state.correctAns
    }
  },
  actions: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    change(state, flavor) {
      state.flavor = flavor;
    },
    setReportData(state, payload) {
      state.reportData[payload.username] = payload.marks;
    },
  },
});

export default store;
