<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector></BuilderDoughSelector>
        <BuilderSizeSelector></BuilderSizeSelector>
        <BuilderIngredientsSelector></BuilderIngredientsSelector>

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

          <BuilderPizzaView></BuilderPizzaView>

          <BuilderPriceCounter></BuilderPriceCounter>
        </div>
      </div>
    </form>
    <router-view />
  </main>
</template>
<script>
import { mapActions, mapState } from "vuex";
//
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "Index",
  components: {
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  methods: {
    ...mapActions("Builder", ["updateTitle"]),

    async change(title) {
      await this.updateTitle(title);
    },
  },
  computed: {
    ...mapState("Builder", ["title"]),
  },
};
</script>
