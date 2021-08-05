import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        feeds: [],
        articles: [],
        isAuthenticated: false,
        username: ''
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
        setUsername(state,username){
            state.username = username

        },
        removeFeed(state,feed){
            var elementsIndex =  state.feeds.indexOf(feed)
            state.feeds.splice(elementsIndex,1)
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
        } ,
        username: state => {
            return state.username
        }
    }
})
export default store;