<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          class="diameter__input"
          :class="`diameter__input--${size.class}`"
          v-for="(size, index) in sizes"
          :key="index"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            :checked="size.checked"
            class="visually-hidden"
            @change="changeSize(index)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BuilderSizeSelector",
  props: {
    sizes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    changeSize(index) {
      this.$emit("changeSize", index);
    },
  },
};
</script>
