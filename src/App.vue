<template>
    <router-view></router-view>
</template>
<script>
import { initColor } from "@/until/themeColorClient";
export default {
    mounted() {
        initColor()
    }
}
</script>