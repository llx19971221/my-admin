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
                <div class="tool-user-wrap">
                    <div class="tool">
                        <i 
                        @click="requestFullScreen" 
                        class="el-icon-full-screen"></i>
                    </div>
                    <div class="user-wrap">
                        <el-dropdown @command="handleCommand" command trigger="click">
                            <el-avatar style="cursor: pointer;" icon="el-icon-user-solid"></el-avatar>
                            <el-dropdown-menu
                            slot="dropdown">
                                <el-dropdown-item command="0">个人中心</el-dropdown-item>
                                <el-dropdown-item command="1">页面设置</el-dropdown-item>
                                <el-dropdown-item command="2">退出登陆</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-drawer
                        size="210px"
                        title="布局设置"
                        :visible.sync="drawer">
                            <el-form
                            label-position="left"
                            :model="formData">
                                <el-form-item 
                                prop="color" 
                                label="主题色">
                                    <el-color-picker
                                    color-format='hex'
                                    @change="handleThemeColor" 
                                    v-model="formData.color"/>
                                </el-form-item>
                            </el-form>
                        </el-drawer>
                    </div>
                </div>
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
import { changeThemeColor } from "@/until/themeColorClient";
export default {
    data() {
        return {
            isCollapse: false,
            drawer: false,
            formData: {
                color: localStorage.getItem("theme_color")
            }
        }
    },
    methods: {
        handleCommand(command) {
           if(command == 1) {
               this.drawer = true
           }
        },
        handleThemeColor() {
            changeThemeColor(this.formData.color)
        },
        requestFullScreen() {
           const html = document.documentElement;
            if (html.requestFullscreen) {
                html.requestFullscreen();
            } else if (html.mozRequestFullScreen) {
                html.mozRequestFullScreen();
            } else if (html.webkitRequestFullScreen) {
                html.webkitRequestFullScreen();
            }
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
            return newRoute;
        },
        childrenRoute() {
            // childrenRoute.shift();
            // console.log(childrenRoute)
            return childrenRoute.slice(1);
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
    position: absolute;
    opacity: 0;
    transform: translateX(-20px);
}
.routerTs-leave-to {
    position: absolute;
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

 /deep/ :focus {
    outline: 0;
}

@media only screen and(max-width: 1100px) {
    .el-aside {
        display: none;
    }
}
.index-wrap {
    height: 100%;
    .el-main {
        overflow: hidden;
        background-color: rgb(240,242,245);
    }
    .admin-header {
        display: flex;
        align-items: center;
        font-size: 15px;
        padding: 0 60px 0 30px;
        [class^='el-icon'] {
            font-size: 25px;
            margin-right: 10px;
            cursor: pointer;
        }
        
        .tool-user-wrap {
            display: flex;
            align-items: center;
            height: 100%;
        }
        .tool {
            > *{
                padding: 5px;
                &:hover {
                    background-color: rgba(192,192,192,.2);
                }
            }
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

    .el-form {
        padding: 0 50px;
    }
}
</style>
<style lang="less">
.el-breadcrumb {
    flex: 1;
}
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