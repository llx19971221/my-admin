<template>
    <div class="wrap">
        <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>

        <el-divider content-position="left">登陆用户信息</el-divider>
        <el-table
            :data="loginInfoList"
            style="width: 100%">
            <el-table-column
            label="ip地址">
            <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.ip }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="服务商">
            <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <el-tag
                :type="scope.row.service === '联通' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.service}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            label="源头"
            prop="address">
            </el-table-column>
            <el-table-column
            label="登陆日期"
            prop="loginTime">
                <template v-slot:default="{loginTime}">
                {{loginTime | formatDate}}
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleForceLogout(scope.row)">强制下线</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
    data() {
        return {
            dateRange: []
        }
    },
    mounted() {
        this.userControlQueryAll()
    },
    filters: {
        formatDate(val) {
            return moment(val).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    computed: {
        ...mapState("userControl", {
            loginInfoList: "loginInfoList"
        })
    },
    methods: {
        ...mapActions("userControl", {
            userControlQueryAll: "userControlQueryAll"
        }),
        handleForceLogout({ip}) {

        }
    }
}
</script>