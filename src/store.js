import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    resume: []
  },
  getters: {
    resume: store => {
      return store.resume;
    }
  },

  mutations: {
    push: (store, payload) => {
      let index = store.resume.findIndex(section => {
        return section.meta == payload.meta;
      });
      store.resume[index] = payload;
    }
  }
});
