import axios from 'axios';

const state = {
  token: localStorage.getItem('_token') || '',
  isAuthenticated: false,
  hasChecked: false,
  user: null,
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
};

const actions = {
    async verifyToken({ commit }) {
      try {
        const token = localStorage.getItem('_token');
        if (!token) throw new Error('No token');
  
        const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/verify-token', null, {
          headers: {
            Authorization: token
          }
        });
  
        commit('setAuthenticated', true);
        commit('setUser', response.data.data);
        commit('setHasChecked', true);
  
        return true;
      } catch (error) {
        commit('setAuthenticated', false);
        commit('setUser', null);
        commit('setHasChecked', true);
        return false;
      }
    },
    logout({ commit }) {
        localStorage.removeItem('_token');
        commit('logout');
    }
  }
  

const mutations = {
  setAuthenticated(state, status) {
    state.isAuthenticated = status;
  },
  setUser(state, user) {
    state.user = user;
  },
  setHasChecked(state, checked) {
    state.hasChecked = checked;
  },
  logout(state) {
    state.token = '';
    state.user = null;
    state.isAuthenticated = false;
    state.hasChecked = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
