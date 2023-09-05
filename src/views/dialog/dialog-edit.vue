<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
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
        width="100"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <!-- 日志记录时间 -->
      <el-table-column
        :label="$t('table.dialog_time')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.timestamp}}</span>
        </template>
      </el-table-column>
      <!-- 日志名-->
      <el-table-column
        :label="$t('table.dialog_name')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.dname }}</span>
        </template>
      </el-table-column>
      <!-- 日志描述 -->
      <el-table-column
        :label="$t('table.dialog_des')"
        width="350px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <!-- 日志分类 -->
      <el-table-column
        :label="$t('table.dialog_kind')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.kinds }}</span>
        </template>
      </el-table-column>
      <!-- 日志等级 -->
      <el-table-column
        :label="$t('table.dialog_lev')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.level }}</span>
        </template>
      </el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        :label="$t('table.equip_no')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.no }}</span>
        </template>
      </el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        :label="$t('table.equip_name')"
        width="150px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.operation')"
        align="center"
        width="270"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <el-button
            type="primary"
            size="mini"
            @click="showdialogForm(row.id)"
          >
            {{ $t('table.edit') }}
          </el-button>

          <el-button
            v-if="row.status!=='deleted'"
            size="mini"
            type="danger"
            @click="showConfirmDialog()"
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
          <!-- <el-button -->
            <!-- v-if="row.status!=='deleted'" -->
            <!-- size="mini" -->
            <!-- type="success" -->
            <!-- @click="showDialogDescription()" -->
          <!-- > -->
            <!-- {{ $t("查看详情") }} -->
          <!-- </el-button> -->
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
        :model="tempDialogsData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
    >
      <!-- 日志名 -->
        <el-form-item :label="$t('日志名')">
          <el-input
            v-model="tempDialogsData.dname"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志时间 -->
        <el-form-item :label="$t('日志时间')">
          <el-input
            v-model="tempDialogsData.timestamp"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志描述 -->
        <el-form-item :label="$t('日志描述')">
          <el-input
            v-model="tempDialogsData.description"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志分类 -->
        <el-form-item :label="$t('日志分类')">
          <el-input
            v-model="tempDialogsData.kinds"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志等级 -->
        <el-form-item :label="$t('日志等级')">
          <el-input
            v-model="tempDialogsData.level"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 设备编号 -->
        <el-form-item :label="$t('设备编号')">
          <el-input
            v-model="tempDialogsData.no"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 设备厂商 -->
        <el-form-item :label="$t('设备名称')">
          <el-input
            v-model="tempDialogsData.sname"
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
          @click="dialogStatus==='create'?createData():updateData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="dialogDescriptionVisible"
    >
    <el-form
        ref="dataForm"
        :rules="rules"
        :model="detailData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
    >
      <!-- 日志名 -->
        <el-form-item :label="日志名">
          <el-description
            v-model="detailData.dname"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志描述 -->
        <el-form-item :label="日志描述">
          <el-description
            v-model="detailData.dname"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志分类 -->
        <el-form-item :label="日志分类">
          <el-description
            v-model="detailData.kinds"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 日志水平 -->
        <el-form-item :label="日志等级">
          <el-description
            v-model="detailData.level"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 设备编号 -->
        <el-form-item :label="设备编号">
          <el-description
            v-model="detailData.no"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      <!-- 设备名称 -->
        <el-form-item :label="设备名称">
          <el-description
            v-model="detailData.sname"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
    </el-form>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import { DialogData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'
import { createDialogs, getDialogs,deleteDialogs,updateDialogs,defaultDialogsData,detailDialogs } from '@/api/dialogs'

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
  private list: DialogData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page_id: 1,
    limit: 20,
    // importance: undefined,
    table_id: 2,//日志泛化表
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
  private confirmDialogVisible=false
  // private statusOptions = ['published', 'draft', 'deleted']
  private showReviewer = false
  private dialogFormVisible = false
  private dialogStatus = ''
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  private dialogPageviewsVisible = false
  private dialogDescriptionVisible = false
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempDialogsData = defaultDialogsData
  private detailData:any[]=[]
  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getDialogs(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
    private async showdialogForm(row:any){
    this.dialogFormVisible=true
    this.dialogStatus='update'
    const { data }=await detailDialogs({tableId:this.listQuery.table_id, itemId: row})
    this.detailData=data.items
  }
  private showDialogDescription(){
    this.dialogDescriptionVisible=true
  }
  private handleFilter() {
    this.listQuery.page_id = 1
    this.getList()
  }
  private showConfirmDialog(){
    this.confirmDialogVisible=true
  }
  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: '操作成功',
      type: 'success'
    })
    row.status = status
  }
  private handleDelete(row: any, index: number) {
    deleteDialogs({ tableId: this.listQuery.table_id, itemId: row.id })
    this.confirmDialogVisible=false
    // 如果deleteDialogs运行成功，则会删除。所以现在报404的错
    this.list.splice(index, 1)
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

  private resettempDialogsData() {
    this.tempDialogsData = cloneDeep(defaultDialogsData)
  }

  private handleCreate() {
    this.resettempDialogsData()
    this.dialogStatus = 'create'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        const articleData = this.tempDialogsData
        articleData.id = "1"// mock a id
        const { data } = await createDialogs({ table_id: this.listQuery.table_id, articleData: this.tempDialogsData })
        this.list.unshift(this.tempDialogsData)
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
    this.tempDialogsData = Object.assign({}, row)
    // this.tempDialogsData.timestamp = +new Date(this.tempDialogsData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        // this.tempDialogsData=.unshift(data.article)
        const tempData = Object.assign({}, this.tempDialogsData)
        this.dialogFormVisible = false
        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateDialogs({table_ID:this.listQuery.table_id, tempData_ID: this.tempDialogsData.id, article: tempData })
        const index = this.list.findIndex(v => v.id === data.article.id)
        this.list.splice(index, 1, data.article)
      }
    })
  }
  private cancelDelete(){
    this.confirmDialogVisible=false
  }
}
</script>
