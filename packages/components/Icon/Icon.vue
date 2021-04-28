<template>
  <i
    :class="iconCls"
    :style="styleCls"
    @click="iconClick"
    @mousedown="iconMousedown"
  ></i>
</template>

<script>
const prefixCls = "h-icon";
export default {
  name: "HIcon",
  mixins: [],
  components: {},
  props: {
    name: String,
    color: String,
    size: [Number, String],
    fontClass: {
      type: String,
      default: "iconfont",
    },
  },
  data() {
    return {};
  },
  computed: {
    iconCls() {
      return [
        `${prefixCls}`,
        `${this.fontClass}`,
        `${this.fontClass === "iconfont" ? "icon" : ""}-${this.name}`,
        `${prefixCls}-${this.name}`,
      ];
    },
    styleCls() {
      const style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.size) {
        style["font-size"] = this.size + "px";
      }
      return style;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    iconClick(e) {
      this.emit("on-click", e);
    },
    iconMousedown(e) {
      this.emit("on-mouse-down", e);
    },
  },
};
</script>

