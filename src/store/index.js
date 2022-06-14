import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    info: {}, //传递的信息
    dsSave: {}
  },
  getters: {
    getDsSave(state) {
      return state.dsSave;
    }
  },
  mutations: {

    //设置第三方信息中要传递的信息
    setPassInfo(state, params) {
      state.info = params.info
    },
    setDsSave(state, params) {
      state.dsSave = params.dsSave
    },
    deleteDsSave(state) {
      state.dsSave = {};
    },

  }
})

export default store
