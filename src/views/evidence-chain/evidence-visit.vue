<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 输入框 -->
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 60%;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      >
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
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="120"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
    <!-- 证据头 -->
      <el-table-column
        align="center"
        label="证据头"
        width="420px"
      >
      <template slot-scope="{row}">
        <span>{{ row.head_evidence_id }}</span>
        </template>
      </el-table-column>
    <!-- 证据链 -->
      <el-table-column
        width="420px"
        align="center"
        label="证据2"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence2_id }}</span>
        </template>
      </el-table-column>
    <!-- 证据尾 -->
      <el-table-column
        align="center"
        label="证据3"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence3_id }}</span>
        </template>
      </el-table-column>
          <el-table-column
        align="center"
        label="证据4"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence4_id }}</span>
        </template>
      </el-table-column>
        <el-table-column
        align="center"
        label="证据5"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence5_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="证据6"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence6_id }}</span>
        </template>
      </el-table-column>
        <el-table-column
        align="center"
        label="证据7"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence7_id }}</span>
        </template>
      </el-table-column>
        <el-table-column
        align="center"
        label="证据尾"
        width="420px"
      >
        <template slot-scope="{row}">
          <span>{{ row.tail_evidence_id }}</span>
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
import { Form } from 'element-ui'
import { getArticles } from '@/api/articles'
import { EvidenceChainData  } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ComplexTable',
  components: {
    Pagination
  },
    filters: {
    typeFilter: (type: string) => {
    }
  }
})
//这里命名写死了，因为具体是什么还没定
//  id:number//id序号
 // evidence_head_id:number//证据头
 // evidence_id:number[]//证据链
//  evidence_tail_id:number//证据尾
export default class extends Vue {
  private list: EvidenceChainData[] = []
  private listLoading = true
  private total = 0
  private listQuery = {
    page_id: 1,
    limit: 20,
    table_id: 7,
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
  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
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
