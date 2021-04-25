<template>
  <button
    ref="btn"
    :title="tltle"
    :type="nativeType"
    :class="classes"
    :style="styleCls"
    :disabled="disabled"
    @click="handleClick"
    @keyup="keyup"
    @keydown="keydown"
    @blur="handleBlur"
  >
    <Icon name="load-c" v-if="loading" class="h-load-loop"></Icon>
    <Icon :name="icon" v-if="!!icon && !loading"></Icon>
  </button>
</template>

<script>
import Icon from "../Icon";
const types = [
  "primary",
  "ghost",
  "dashed",
  "text",
  "danger",
  "info",
  "success",
  "warning",
  "error",
  "transparent",
];
export default {
  name: "",
  mixins: [],
  components: { Icon },
  props: {
    type: {
      validator(value) {
        return types.includes(value);
      },
    },
    btnWidth: {
      type: Number,
      default: 0,
    },
    btnHeight: {
      type: Number,
      default: 0,
    },
    btnBgColor: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "",
    },
    size: {
      validator(value) {
        return ["small", "large"].includes(value);
      },
    },
    shape: {
      validator(value) {
        return ["circle", "circle-outline"].includes(value);
      },
    },
    loading: {
      type: Boolean,
      dafault: false,
    },
    disabled: {
      type: Boolean,
      dafault: false,
    },
    nativeType: {
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
    icon: String,
    long: {
      type: Boolean,
      default: false,
    },
    title: String,
    canFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    showSlot() {
      return !!this.$slots.default;
    },
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-disable`]: !!this.disabled,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading !== null && this.loading,
          [`${prefixCls}-icon-only`]:
            !this.showSlot && (!!this.icon || this.loading),
          [`${prefixCls}-focus`]: this.canFocus,
        },
      ];
    },
    styleCls() {
      const style = {};
      if (this.btnWidth > 0) {
        style.width = this.btnWidth;
      }
      if (this.btnHeight > 0) {
        style.height = this.btnHeight;
      }
      if (this.btnBgColor) {
        style.bgColor = this.btnBgColor;
      }
      if (this.textColor) {
        style.color = this.textColor;
      }
      return style;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    handleClick(e) {
      this.emit("click", e);
      this.emit("on-click", e);
    },
    focus() {
      if (!this.canFocus) return;
      this.$refs.btn.focus();
    },
    blur() {
      if (!this.canFocus) return;
      this.$refs.btn.blur();
    },
    keyup(e) {
      if (!this.canFocus || this.loading) return;
      let code = e.keyCode;
      if (code === 13) {
        this.handleClick(e);
      }
    },
    keydown(e) {
      e = e || window.event;
      e.preventDefault();
    },
    handleBlur(e) {
      this.$emit("on-blur", e);
    },
  },
};
</script>

 
