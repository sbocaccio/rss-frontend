import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        feeds: [],
        articles: [],
    },
    mutations: {
        addFeed(state, feed) {
            state.feeds.push(feed);
        },
        setFeeds(state, feeds) {
            state.feeds = feeds
        },
        setArticles(state, articles) {
            state.articles = articles
        },
    },
    getters: {
        feeds: state => {
            return state.feeds
        },
        articles: state  => {
            return state.articles
        }
    }
})
export default store;