<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('evidence.title')"
        style="width: 300px;"
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
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('evidence.type')"
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
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('evidence.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('evidence.add') }}
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
        :label="$t('evidence.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_id }}</span>
        </template>
      </el-table-column>
      <!-- 日志记录时间 -->
      <el-table-column
        :label="$t('evidence.date')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_time }}</span>
        </template>
      </el-table-column>
      <!-- 操作主体 -->
      <el-table-column
        :label="$t('evidence.src_id')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.source }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>

      <!-- 操作客体 -->
      <el-table-column
        :label="$t('evidence.dst_id')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.aim }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 操作类型 -->
      <el-table-column
        :label="$t('evidence.type3')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.ope}}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 所在域 -->
      <el-table-column
        :label="$t('evidence.yu')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.location}}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 攻击类型 -->
      <el-table-column
        :label="$t('evidence.type1')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.kind }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 设备名 -->
      <el-table-column
        :label="$t('evidence.name')"
        width="120px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.dev_name }}</span>
        </template>
      </el-table-column>
      <!-- 操作结果 -->
      <el-table-column
        :label="$t('evidence.result')"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_result }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 日志归属类型 -->
      <el-table-column
        :label="$t('evidence.type2')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.log_kind }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 调用进程号-->
      <el-table-column
        :label="$t('调用进程号')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_process }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 原始日志记录ID -->
      <el-table-column
        :label="$t('原始日志记录ID')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_log_id }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 对应警告信息ID -->
      <el-table-column
        :label="$t('对应警告信息ID')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_alarm_id }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 备用属性1 -->
      <el-table-column
        :label="$t('备用属性1')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_standby1 }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
        <!--  备用属性2-->
      <el-table-column
        :label="$t('备用属性2')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.evi_standby2 }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
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
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >

      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempEvidenceData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >

        <!-- 评论 证据id -->
        <el-form-item :label="$t('evidence.id')">
          <el-input
            v-model="tempEvidenceData.id"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 日志记录时间 -->
        <el-form-item :label="$t('evidence.date')">
          <el-input
            v-model="tempEvidenceData.timestamp"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 操作主体 -->
        <el-form-item :label="$t('evidence.src_id')">
          <el-input
            v-model="tempEvidenceData.src_id"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 操作客体 -->
        <el-form-item :label="$t('evidence.dst_id')">
          <el-input
            v-model="tempEvidenceData.dst_id"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 操作类型 -->
        <el-form-item :label="$t('evidence.type3')">
          <el-input
            v-model="tempEvidenceData.type3"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 所在域 -->
        <el-form-item :label="$t('evidence.yu')">
          <el-input
            v-model="tempEvidenceData.yu"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 攻击类型 -->
        <el-form-item :label="$t('evidence.type1')">
          <el-input
            v-model="tempEvidenceData.type1"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 设备名 -->
        <el-form-item :label="$t('evidence.name')">
          <el-input
            v-model="tempEvidenceData.name1"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 操作结果 -->
        <el-form-item :label="$t('evidence.result')">
          <el-input
            v-model="tempEvidenceData.result"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 日志归属类型 -->
        <el-form-item :label="$t('evidence.type2')">
          <el-input
            v-model="tempEvidenceData.type2"
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
          {{ $t('evidence.cancel') }}
        </el-button>
        <el-button
          type="primary"
          v-if="dialogStatus==='create'"
          @click="createData()"
        >
          {{ $t('evidence.confirm') }}
        </el-button>
        <el-button
          type="primary"
          v-if="dialogStatus==='update'"
          @click="updateData()"
        >
          {{ $t('evidence.confirm') }}
        </el-button>
        <el-button
          type="primary"
          v-if="dialogStatus==='details'"
          @click="handleUpdate(row1)"
        >
          {{ $t('evidence.edit') }}
        </el-button>
        <el-button
          type="primary"
          v-if="dialogStatus==='details'"
          @click="handleDelete(row1, index1)"
        >
          {{ $t('evidence.delete') }}
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
        >{{ $t('evidence.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { getEvidences, getPageviews, createEvidence, updateEvidence, defaultEvidenceData } from '@/api/evidence'
import { EvidenceData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
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
  name: 'ComplexTable',
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
  private list: EvidenceData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page: 1,
    limit: 10,
    table_id: 4,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  private importanceOptions = [1, 2, 3]
  private calendarTypeOptions = calendarTypeOptions
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  // private statusOptions = ['published', 'draft', 'deleted']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    details: 'Details',
    create: 'Create'
  }
  private row1 =''
  private index1 =0

  private dialogPageviewsVisible = false
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempEvidenceData = defaultEvidenceData

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getEvidences(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
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

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
  }

  private resetTempEvidenceData() {
    this.tempEvidenceData = cloneDeep(defaultEvidenceData)
  }

  private handleCreate() {
    this.resetTempEvidenceData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const EvidenceData = this.tempEvidenceData
        EvidenceData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        EvidenceData.author = 'vue-typescript-admin'
        const { data } = await createEvidence({ Evidence: EvidenceData })
        data.Evidence.timestamp = Date.parse(data.Evidence.timestamp)
        this.list.unshift(data.Evidence)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleUpdate(row: any) {
    this.tempEvidenceData = Object.assign({}, row)
    this.tempEvidenceData.timestamp = +new Date(this.tempEvidenceData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }


  private handleDetails(row: any, index: number) {
    this.tempEvidenceData = Object.assign({}, row)
    this.dialogStatus = 'details'
    this.dialogFormVisible = true
    this.row1 = row
    this.index1 = index
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const tempData = Object.assign({}, this.tempEvidenceData)
        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateEvidence(tempData.id, { Evidence: tempData })
        const index = this.list.findIndex(v => v.id === data.Evidence.id)
        this.list.splice(index, 1, data.Evidence)
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
    this.$notify({
      title: 'Success',
      message: 'Delete Successfully',
      type: 'success',
      duration: 2000
    })
    this.list.splice(index, 1)
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    const data = formatJson(filterVal, this.list)
    exportJson2Excel(tHeader, data, 'table-list')
    this.downloadLoading = false
  }
}
</script>
