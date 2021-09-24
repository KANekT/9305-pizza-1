import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  SET_DATA,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

Vue.use(Vuex);

const initState = () => ({});

const state = initState();

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
    dispatch("Cart/query");
  },
};

const mutations = {
  [SET_DATA](state, { module, value }) {
    module ? (state[module] = value) : (state = value);
  },
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    console.log(id);
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});