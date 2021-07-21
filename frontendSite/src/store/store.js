
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    feeds: []
  },
  mutations: {
    addFeed (state, feed){
      state.feeds.push(feed);
    },
    setFeed(state,feeds){
      state.feeds = feeds
    }
  },
})
export default store;