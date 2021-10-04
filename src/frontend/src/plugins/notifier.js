import { NOTIFICATION_TYPES } from "@/common/constants";

// eslint-disable-next-line max-len
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: NOTIFICATION_TYPES.INFO,
    });
  }

  success(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: NOTIFICATION_TYPES.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: NOTIFICATION_TYPES.ERROR,
    });
  }

  warning(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: NOTIFICATION_TYPES.WARNING,
    });
  }
}
