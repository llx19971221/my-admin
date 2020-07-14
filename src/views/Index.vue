<template>
    <el-container class="index-wrap">
        <el-aside 
            :class="{
                'is-collpase': isCollapse
            }" 
            width="200px">
            <div class="logo-wrap">
                <img width="32" height="32" src="@/assets/logo.png" alt="logo"/>
                <transition name="hTitle">
                    <h1 v-if="!isCollapse" class="title">myAdmin</h1>
                </transition>
            </div>
            <el-menu
            active-text-color="#409eff"
            text-color="rgb(191, 203, 217)"
            background-color="inherit"
            :collapse="isCollapse"
            :default-active="$route.path"
            router
            class="el-menu-vertical-demo">
            <el-menu-item 
            index="/dashboard">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu 
            v-for="route in childrenRoute"
            :key="route.path"
            :index="route.path">
                <template slot="title">
                    <i :class="route.meta.icon"></i>
                    <span>{{route.meta.title}}</span>
                </template>
                <el-menu-item 
                v-for="route2 in route.children" 
                :key="route2.path"
                :index="route.path + '/' + route2.path">
                    <i :class="route2.meta.icon"></i>
                    <span slot="title">{{route2.meta.title}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        </el-aside>
        <el-container>
            <el-header class="admin-header">
                <i @click="isCollapse = !isCollapse" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                <transition-group tag="ElBreadcrumb" name="breadcrumb">
                        <ElBreadcrumbItem
                        v-for="item in routes" 
                        :key="item.path">
                            <router-link v-if="item.meta.link" :to="item.path ? item.path : '/dashboard'">
                                {{item.meta.title}}
                            </router-link>
                            <span v-else>
                                {{item.meta.title}}
                            </span>
                        </ElBreadcrumbItem>
                </transition-group>
            </el-header>
            <el-main>
                <transition name="routerTs">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {childrenRoute} from "@/router";
export default {
    data() {
        return {
            isCollapse: false,
        }
    },
    computed: {
        routes() {
            const routes = this.$route.matched;
            const newRoute = routes.filter((el,idx) => {
                return el.meta.title;
            })
            if(newRoute.length === 1) {
                newRoute[0].meta['link'] = false;
            }else {
                newRoute[0].meta['link'] = true;
            }
            // console.log(routes)
            return newRoute;
        },
        childrenRoute() {
            childrenRoute.shift()
            // childrenRoute[0].path = '/';
            return childrenRoute;
        }
    }
}
</script>
<style lang="less" scoped>
.breadcrumb-enter,
.breadcrumb-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.breadcrumb-enter-active,
.breadcrumb-leave-active,
.routerTs-enter-active,
.routerTs-leave-active {
    transition: .8s ease;
}
.breadcrumb-enter-to,
.routerTs-enter-to {
    opacity: 1;
    transform: translateX(0);
}
.routerTs-enter {
    opacity: 0;
    transform: translateX(-20px);
}
.routerTs-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
.hTitle-enter,
.hTitle-leave-to {
    opacity: 0;
}

.hTitle-enter-active,
.hTitle-leave-active {
    transition: .6s ease;
}

.hTitle-enter-to {
    opacity: 1;
}

.index-wrap {
    height: 100%;
    .el-main {
        overflow: hidden;
    }
    .admin-header {
        display: flex;
        align-items: center;
        font-size: 15px;
        [class^='el-icon'] {
            font-size: 25px;
            margin-right: 10px;
            cursor: pointer;
        }
    }

    .el-aside {
        background-color: rgb( 48,65,86);
        transition: .6s ease;
        overflow: hidden;
        &.is-collpase {
            width: 64px !important;
        }
    }
    
    .logo-wrap {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        font-weight: normal;
        padding: 10px 15px;
    }
    .el-menu {
        border: none;
    }
    .el-menu-item:hover,
    /deep/ .el-submenu__title:hover{
        background-color: #263445 !important;
    }
}
</style>
<style lang="less">
.el-menu--vertical {
    left: 70px !important;
    background-color: rgb( 48,65,86) !important;
    .el-menu-item:hover,
    /deep/ .el-submenu__title:hover{
        background-color: #263445 !important;
    }
    /deep/.el-menu--popup-right-start {
        margin: 0;
        padding: 0;
    }
}
</style>