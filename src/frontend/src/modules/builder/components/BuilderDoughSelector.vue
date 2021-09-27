<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          class="dough__input"
          :class="`dough__input--${dough.value}`"
          v-for="(dough, index) in doughs"
          :key="dough.id"
        >
          <input
            type="radio"
            name="dought"
            :value="dough.value"
            :checked="dough.checked"
            class="visually-hidden"
            @change="change(index)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "BuilderDoughSelector",
  computed: {
    ...mapState("Builder", ["doughs"]),
  },
  methods: {
    ...mapActions("Builder", ["changeDough"]),

    async change(index) {
      await this.changeDough(index);
    },
  },
};
</script>
