<template>
  <div class="text-field">
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :readonly="readonly"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError" class="text-field__text">
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>
