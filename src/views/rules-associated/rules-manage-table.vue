<template>
    <div class="app-container">
      <div class="filter-container">
        <!-- 输入框 -->
        <el-input
          v-model="listQuery.search_info"
          :placeholder="$t('table.title')"
          style="width: 60%;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        >
        <el-option
            v-for="item in importanceOptions"
            :key="item"
            :label="item"
            :value="item"
          />
      </el-input>
      <!-- 搜索按钮 -->
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          {{ $t('table.search') }}
        </el-button>
      </div>
      <!--以上都是搜索框的内容  -->
        <!-- 下面是列表展示  -->
        <!-- v-loading 过渡效果 listLoading
               data 遍历的数组
               border 是否带有纵向边框
               fit 列的宽度是否自撑开
               @sort-change 当表格的排序条件发生变化的时候会触发该事件
          -->
      <!-- 表格列 -->
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
      <!-- 序号 -->
        <el-table-column
          align="center"
          label="ID"
          width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
      <!-- 规则名称 -->
        <el-table-column
          align="center"
          label="规则名称"
          width="180px"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
      <!-- 对应证据属性 -->
        <el-table-column
          width="420"
          align="center"
          label="对应证据属性"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column
          align="center"
          label="创建时间"
          width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column
          align="center"
          label="创建时间"
          width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <!-- 创建者 -->
        <el-table-column
          align="center"
          label="创建者"
          width="100"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
      <!-- 弃用时间 -->
      <el-table-column
          align="center"
          label="弃用时间"
          width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
    </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />

    </div>
  </template>

  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { getArticles } from '@/api/articles'
  import { IArticleData } from '@/api/types'
  import Pagination from '@/components/Pagination/index.vue'

  @Component({
    name: 'rules-visit-table',
    components: {
      Pagination
    }
  })
  export default class extends Vue {
    private list: IArticleData[] = []
    private listLoading = true
    private total = 0
    private listQuery = {
      page_id: 1,
      limit: 20,
      table_id: 3,
      title: undefined,
      type: undefined,
      sort: '+id'
    }

    private importanceOptions = [1, 2, 3]

    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const { data } = await getArticles(this.listQuery)
      const items = data.items
      this.total = data.total
      this.list = data.items
      // this.list = items.map((v: any) => {
        //'$set'是Vue.js提供的全局方法，用于为响应式对象添加新的属性
        //这里就是给当前数组项添加一个名为'edit'的属性，并将其初始值设为‘false’。
        //这样可以确保新添加的属性也是响应式的，可以触发视图更新。
        // this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        //这行代码为每个数组项 v 添加了一个名为 originalTitle 的属性，并将 v.title 的值赋给它。这个属性可能在用户点击取消按钮时使用，以保存原始的标题值。
        // v.originalTitle = v.title // will be used when user click the cancel botton
        //  return v
      //  })
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    private handleFilter() {
      this.listQuery.page_id = 1
      this.getList()
    }
  }
  </script>

  <style lang="scss" scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  </style>
