<template>
    <div class="app-container">
      <div class="filter-container">
        <el-input
          v-model="listQuery.title"
          :placeholder="$t('table.title')"
          style="width: 200px;"
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
        <!-- 选择类型 -->
        <el-select
          v-model="listQuery.type"
          :placeholder="$t('table.type')"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in calendarTypeOptions"
            :key="item.key"
            :label="item.displayName+'('+item.key+')'"
            :value="item.key"
          />
        </el-select>
        <!-- 排序 -->
        <el-select
          v-model="listQuery.sort"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
        <!-- 搜索 -->
        <el-button
          v-waves
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          {{ $t('table.search') }}
        </el-button>
        <!-- 添加 -->
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          {{ $t('table.add') }}
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
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <!-- id -->
        <el-table-column
          :label="$t('table.id')"
          prop="id"
          sortable="custom"
          align="center"
          width="80"
          :class-name="getSortClass('id')"
        >
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!-- 显示规则名称-->
        <el-table-column
          :label="$t('规则名称')"
          width="180px"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.relation_name}}</span>
          </template>
        </el-table-column>
        <!-- 对应证据属性 -->
        <el-table-column
          :label="$t('对应证据属性')"
          min-width="200px"
          align="center"
        >
          <template slot-scope="{row}">
            <span
            >{{row.evi_attribute}}</span>
          </template>
        </el-table-column>

        <!-- 创建时间 -->
        <el-table-column
          :label="$t('创建时间')"
          min-width="150px"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column
          :label="$t('状态')"
          min-width="80px"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.state }}</span>
          </template>
        </el-table-column>
        <!-- 创建者 -->
        <el-table-column
          :label="$t('创建者')"
          min-width="100px"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.creator }}</span>
          </template>
        </el-table-column>
        <!-- 弃用时间 -->
        <el-table-column
          :label="$t('弃用时间')"
          min-width="150px"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{ row.delete_time }}</span>
          </template>
        </el-table-column>
        <!-- 动作 -->
        <el-table-column
          :label="$t('table.actions')"
          align="center"
          width="250"
          class-name="fixed-width"
        >
          <template slot-scope="{row, $index}">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >
              {{ $t('table.edit') }}
            </el-button>
            <el-button
              v-if="row.status!=='deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
            >
              {{ $t('table.delete') }}
            </el-button>
            <el-dialog
            title="确认删除"
            :visible.sync="confirmDialogVisible"
            width="30%"
            @close="handleConfirmDialogClose"
          >
              <span>确定要删除该条目吗？</span>
              <span slot="footer" class="dialog-footer">
              <el-button @click="handleDelete(row, $index)">确定</el-button>
              <el-button @click="cancelDelete()">取消</el-button>
      </span>
    </el-dialog>
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
      <!-- 对话框 -->
      <!-- visible：是否显示 Dialog，支持 .sync 修饰符 -->
      <!--  -->
      <!--  -->
      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
      >
      <el-form
          ref="dataForm"
          :rules="rules"
          :model="tempArticleData.type"
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;"
      >
        <!-- 规则名称 -->
          <el-form-item :label="$t('规则名称')">
            <el-input
              v-model="tempArticleData.rules_name"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <!-- 对应证据属性 -->
          <el-form-item :label="$t('对应证据属性')">
            <el-input
              v-model="tempArticleData.evidence_attr"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <!-- 创建时间 -->
          <el-form-item :label="$t('创建时间')">
            <el-input
              v-model="tempArticleData.evidence_time"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <!-- 状态 -->
         <el-form-item :label="$t('状态')">
            <el-input
              v-model="tempArticleData.evidence_status"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <!-- 创建者 -->
         <el-form-item :label="$t('创建者')">
            <el-input
              v-model="tempArticleData.evidence_creator"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <!-- 弃用时间 -->
          <el-form-item :label="$t('弃用时间')">
            <el-input
              v-model="tempArticleData.timestamp"
              :autosize="{minRows: 1, maxRows: 1}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
      </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button
            type="primary"
            @click="dialogStatus=='create'?createData():updateData()"
          >
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogPageviewsVisible"
        title="Reading statistics"
      >
        <el-table
          :data="pageviewsData"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            prop="key"
            label="Channel"
          />
          <el-table-column
            prop="pageviews"
            label="Pageviews"
          />
        </el-table>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogPageviewsVisible = false"
          >{{ $t('table.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getRules, getPageviews, createRules, updateRules, defaultRulesAssociatedData, deleteRules } from '@/api/assosicate_rule'
import { RulesAssociatedData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

const calendarTypeOptions = [
  { key: 'CN', displayName: 'China' },
  { key: 'US', displayName: 'USA' },
  { key: 'JP', displayName: 'Japan' },
  { key: 'EU', displayName: 'Eurozone' }
]

  // arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: { [key: string]: string }, cur) => {
acc[cur.key] = cur.displayName
  return acc
  }, {}) as { [key: string]: string }
  @Component({
    name: 'rules-manege-table',
    components: {
      Pagination
    },
    filters: {
      typeFilter: (type: string) => {
        return calendarTypeKeyValue[type]
      }
    }
  })
  export default class extends Vue {
    private tableKey = 0
    private list: RulesAssociatedData[] = []
    private total = 0
    private listLoading = true
    private listQuery = {
      page_id: 1,
      limit: 10,
      // importance: undefined,
      table_id: 7,
      title: undefined,
      type: undefined,
      sort: '+id'
    }
    private confirmDialogVisible=false
    private importanceOptions = [1, 2, 3]
    private calendarTypeOptions = calendarTypeOptions
    private sortOptions = [
      { label: 'ID Ascending', key: '+id' },
      { label: 'ID Descending', key: '-id' }
    ]
    private showReviewer = false
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      update: 'Edit',
      create: 'Create'
    }

    private dialogPageviewsVisible = false
    private pageviewsData = []
    private rules = {
      type: [{ required: true, message: 'type is required', trigger: 'change' }],
      timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
      title: [{ required: true, message: 'title is required', trigger: 'blur' }]
    }

    private downloadLoading = false
    private tempArticleData = defaultRulesAssociatedData
    private detailData:any[]=[]
    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const { data } = await getRules(this.listQuery)
      this.list = data.items
      this.total = data.total
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    private handleFilter() {
      this.listQuery.page_id = 1
      this.getList()
    }
    private cancelDelete(){
    this.confirmDialogVisible=false
  }
    private handleModifyStatus(row: any, status: string) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    }

    private sortChange(data: any) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }

    private sortByID(order: string) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    }
    private showConfirmDialog(){
    this.confirmDialogVisible=true
  }
    private getSortClass(key: string) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }

    private resetTempArticleData() {
      this.tempArticleData = cloneDeep(defaultRulesAssociatedData)
    }

    private handleCreate() {
      this.resetTempArticleData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }
    private createData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const articleData = this.tempArticleData
          this.dialogFormVisible = false
          articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
          const { data } = await createRules({ table_id: this.listQuery.table_id, articleData: this.tempArticleData })
          this.list.unshift(this.tempArticleData)
        }
      })
    }

    private handleUpdate(row: any) {
      this.tempArticleData = Object.assign({}, row)
      this.dialogFormVisible = true
      // this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp)
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private updateData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          // this.tempArticleData=.unshift(data.article)
          const tempData = Object.assign({}, this.tempArticleData)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          const { data } = await updateRules({tableId:this.listQuery.table_id, tempId: this.tempArticleData.id, article: tempData })
          const index = this.list.findIndex(v => v.id === data.article.id)
          this.list.splice(index, 1, data.article)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }

    private handleDelete(row: any, index: number) {
      deleteRules({ tableId: this.listQuery.table_id, itemId: row.id })

      this.confirmDialogVisible=false
      this.list.splice(index, 1)
    }

    private async handleGetPageviews(pageviews: string) {
      const { data } = await getPageviews({ pageviews })
      this.pageviewsData = data.pageviews
      this.dialogPageviewsVisible = true
    }
  }
  </script>
