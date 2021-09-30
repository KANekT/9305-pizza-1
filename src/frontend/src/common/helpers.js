import { cloneDeep } from "lodash";
import { RESOURCES } from "@/common/constants";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

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
    [RESOURCES.USERS]: new ReadOnlyApiService(RESOURCES.USERS, notifier),
    [RESOURCES.AUTH]: new AuthApiService(notifier),
    [RESOURCES.COLUMNS]: new CrudApiService(RESOURCES.COLUMNS, notifier),
    [RESOURCES.COMMENTS]: new CrudApiService(RESOURCES.COMMENTS, notifier),
  };
};
