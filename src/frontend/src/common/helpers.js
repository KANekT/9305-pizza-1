import { cloneDeep } from "lodash";
import { RESOURCES } from "@/common/constants";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createID = () => {
  return Math.round(Math.random() * 1000);
};

export function getView(view) {
  return () => import(`@/views/${view}.vue`);
}

export function setCheckedByIndex(items, index) {
  const clItems = cloneDeep(items);
  clItems.forEach((e, i) => {
    e.checked = i === index;
  });
  return clItems;
}

export function setCheckedById(items, id) {
  const clItems = cloneDeep(items);
  clItems.forEach((e) => {
    e.checked = e.id === id;
  });
  return clItems;
}

export const createResources = (notifier) => {
  return {
    [RESOURCES.AUTH]: new AuthApiService(notifier),
    [RESOURCES.USER]: new ReadOnlyApiService(RESOURCES.USER, notifier),
    [RESOURCES.INGREDIENT]: new ReadOnlyApiService(
      RESOURCES.INGREDIENT,
      notifier
    ),
    [RESOURCES.DOUGH]: new ReadOnlyApiService(RESOURCES.DOUGH, notifier),
    [RESOURCES.MISC]: new ReadOnlyApiService(RESOURCES.MISC, notifier),
    [RESOURCES.MISC]: new ReadOnlyApiService(RESOURCES.MISC, notifier),
    [RESOURCES.SAUCE]: new ReadOnlyApiService(RESOURCES.SAUCE, notifier),
    [RESOURCES.SIZE]: new ReadOnlyApiService(RESOURCES.SIZE, notifier),
    [RESOURCES.ORDER]: new CrudApiService(RESOURCES.ORDER, notifier),
    [RESOURCES.ADDRESS]: new CrudApiService(RESOURCES.ADDRESS, notifier),
  };
};
