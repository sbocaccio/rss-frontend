
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    feeds: [],
    articles: [],
    subscription:[],
  },
  mutations: {
    addFeed (state, feed){
      state.feeds.push(feed);
    },
    setFeeds(state,feeds){
      state.feeds = feeds
    },
    setArticles(state,articles){
      state.articles =articles 
    },
    setSubscriptionId(state,id){
      state.subscription =id 
    }
  },
})
export default store;