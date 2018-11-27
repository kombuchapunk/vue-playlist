import Vue from "vue";
import VuePlaylist from "./Playlist.vue";

const Components = {
  VuePlaylist
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
