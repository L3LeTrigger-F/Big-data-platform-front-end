<template>
    <div class="dashboard-container">
      <el-row type="flex" justify="center" align="middle" style="margin-top:200px;">
        <el-button round size="medium" style="top:50%" class="el-button-fi">日志数据</el-button>
        <el-col :span="1"></el-col><el-button round size="medium" style="top:50%" class="el-button-fi">关联规则</el-button>
        <el-col :span="1"></el-col><el-button round size="medium" style="top:50%" class="el-button-fi">证据链</el-button>
      </el-row>
      <el-row>
        <el-col :span="8">
            <el-input v-model="input" placeholder="请输入内容" type="flex" justify="center" style="margin-top:70px;margin-left:98%">
            </el-input>
            <el-row type="flex" justify="center" style="margin-top:40px;margin-left:1250px">
              <el-button  class="el-button-search">搜索</el-button>
              <el-button  class="el-button-search" >查询语法</el-button>
            </el-row>
        </el-col>
    </el-row>
        </div>
      <!-- <component :is="currentRole" /> -->

  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

  @Component({
    name: 'Dashboard',
    components: {
      AdminDashboard,
      EditorDashboard
    }
  })
export default class extends Vue {
[x: string]: any
    private currentRole = 'admin-dashboard'

    get roles() {
      return UserModule.roles
    }

    created() {
      if (!this.roles.includes('admin')) {
        this.currentRole = 'editor-dashboard'
      }
    }
}
</script>
<style>
.button-container {
  display: block;
  margin:0 auto
}
.el-button-fi{
  font-size:20px;
  width:200px;
}
.el-button-search{
  font-size:18px;
  width:180px;
}
</style>

