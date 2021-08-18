import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        feeds: [],
        articles: [],
        isAuthenticated: false,
        username: '',
        folders:[],
    },
    mutations: {
        addFeed(state, feed) {
            state.feeds.push(feed);
        },
        addFolder(state, folder) {
            state.folders.push(folder);
        },
        setFeeds(state, feeds) {
            state.feeds = feeds
        },
        setFolders(state, folders) {
            state.folders = folders
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
        addFolderToFeed(state,data) {
            var feed = data[0]
            var folder = data[1]

            var feedIndex = state.feeds.indexOf(feed)
            var folderIndex = (state.feeds[feedIndex]).folders.indexOf(folder.name)
            if (folderIndex == -1) {
                state.feeds[feedIndex].folders.push(folder.name)
            }
        }
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
        },
        folders: state =>{
            return state.folders
        },
        folderWithName: (state) => (name) => {
            return state.folders.find(folder => folder.name === name )
        },

    }
})
export default store;