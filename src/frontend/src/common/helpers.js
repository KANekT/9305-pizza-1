export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createID = () => {
  return Math.round(Math.random() * 1000);
};

export function getView(view) {
  return () => import(`@/views/${view}.vue`);
}

export function setCheckedByIndex(items, index) {
  items.forEach((e, i) => {
    e.checked = i === index;
  });
  return items;
}

export function setCheckedById(items, id) {
  items.forEach((e) => {
    e.checked = e.id === id;
  });
  return items;
}
