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
            <span>{{ row.relation_name }}</span>
          </template>
        </el-table-column>
      <!-- 对应证据属性 -->
        <el-table-column
          width="420"
          align="center"
          label="对应证据属性"
        >
          <template slot-scope="{row}">
            <span>{{ row.evi_attribute }}</span>
          </template>
        </el-table-column>
      <!-- 创建时间 -->
        <el-table-column
          align="center"
          label="创建时间"
          width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column
          align="center"
          label="状态"
          width="80"
        >
          <template slot-scope="{row}">
            <span>{{ row.state }}</span>
          </template>
        </el-table-column>
        <!-- 创建者 -->
        <el-table-column
          align="center"
          label="创建者"
          width="100"
        >
          <template slot-scope="{row}">
            <span>{{ row.creator }}</span>
          </template>
        </el-table-column>
      <!-- 弃用时间 -->
      <el-table-column
          align="center"
          label="弃用时间"
          width="150"
        >
          <template slot-scope="{row}">
            <span>{{ row.delete_time }}</span>
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
  import { getRules,detailRules,createRules,updateRules, } from '@/api/assosicate_rule'
  import { RulesAssociatedData } from '@/api/types'
  import Pagination from '@/components/Pagination/index.vue'

  @Component({
    name: 'rules-visit-table',
    components: {
      Pagination
    }
  })
  export default class extends Vue {
    private list: RulesAssociatedData[] = []
    private listLoading = true
    private total = 0
    private listQuery = {
      page_id: 1,
      limit: 20,
      table_id: 5,
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
      const { data } = await getRules(this.listQuery)
      const items = data.items
      this.total = data.total
      this.list = data.items
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
