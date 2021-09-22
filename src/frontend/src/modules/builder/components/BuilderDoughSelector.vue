<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          v-for="(dough, index) in doughs"
          :key="index"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.value"
            :checked="dough.checked"
            class="visually-hidden"
            @change="changeDough(index)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    changeDough(index) {
      this.$emit("changeDough", index);
    },
  },
};
</script>
