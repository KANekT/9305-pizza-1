<template>
  <main class="content">
    <form @submit.prevent="onSubmit">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <TheBuilderDoughSelector />
        <TheBuilderSizeSelector />
        <TheBuilderIngredientsSelector />

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              :value="title"
              @change="change($event.target.value)"
              required
            />
          </label>

          <TheBuilderPizzaView />

          <TheBuilderPriceCounter />
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>
<script>
import { mapActions, mapState } from "vuex";
//
import TheBuilderSizeSelector from "@/modules/builder/components/TheBuilderSizeSelector.vue";
import TheBuilderDoughSelector from "@/modules/builder/components/TheBuilderDoughSelector.vue";
import TheBuilderIngredientsSelector from "@/modules/builder/components/TheBuilderIngredientsSelector.vue";
import TheBuilderPizzaView from "@/modules/builder/components/TheBuilderPizzaView.vue";
import TheBuilderPriceCounter from "@/modules/builder/components/TheBuilderPriceCounter.vue";

export default {
  name: "Index",
  components: {
    TheBuilderSizeSelector,
    TheBuilderDoughSelector,
    TheBuilderIngredientsSelector,
    TheBuilderPizzaView,
    TheBuilderPriceCounter,
  },
  methods: {
    ...mapActions("Builder", ["updateTitle"]),

    change(title) {
      this.updateTitle(title);
    },

    async onSubmit() {},
  },
  computed: {
    ...mapState("Builder", ["title"]),
  },
};
</script>
