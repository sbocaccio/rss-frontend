import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        feeds: [],
        articles: [],
        isAuthenticated: false,
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
        setAuthentication(state,loginState){
            state.isAuthenticated = loginState

        },
    },
    getters: {
        feeds: state => {
            return state.feeds
        },
        articles: state  => {
            return state.articles
        },
        isAuthenticated: state => {
            return state.isAuthenticated
        }
    }
})
export default store;