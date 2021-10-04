<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          class="diameter__input"
          :class="`diameter__input--${size.class}`"
          v-for="(size, index) in sizes"
          :key="size.id"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.value"
            :checked="size.checked"
            class="visually-hidden"
            @change="change(index)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TheBuilderSizeSelector",
  computed: {
    ...mapState("Builder", ["sizes"]),
  },
  methods: {
    ...mapActions("Builder", ["changeSize"]),

    change(index) {
      this.changeSize(index);
    },
  },
};
</script>
