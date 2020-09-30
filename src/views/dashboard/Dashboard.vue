<template>
    <!-- <div id="test"></div> -->
	<div id="test2"></div>
</template>
<script>
export default {
    methods: {
        init() {
		}
    },
    mounted() {
        this.init();
    }
}
</script>
<style lang="less">
.bar {
  fill: #0080FF;
  stroke: black;
  stroke-width: 5;
  &:hover {
	fill: red;
  }
}

.test2-text {
	fill: white;
  	font-family: sans-serif
}
</style>