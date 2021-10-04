import { capitalize } from "@/common/helpers";
import { SET_ENTITY } from "@/store/mutations-types";

const entity = "auth";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  getters: {
    isAuth(state) {
      return typeof state.user !== "undefined";
    },
  },
  actions: {
    async logIn({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logOut({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(
        SET_ENTITY,
        {
          ...namespace,
          entity: "user",
          value: undefined,
        },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch("logOut", false);
      }
    },
  },
};
