<template>
  <div class="app-container">
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
        :label="$t('users.id')"
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

      <!-- 登录用户名-->
      <el-table-column
        :label="$t('users.name')"
        width="250px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <!-- 登录密码 -->
      <el-table-column
        :label="$t('users.cryptology')"
        min-width="300px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
            @click="handleUpdate(row)"
          >{{ row.cryptology }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!--创建时间 -->
      <el-table-column
        :label="$t('users.create_time')"
        width="250px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.create_time }}</span>
        </template>
      </el-table-column>
      <!-- 用户角色 -->
      <el-table-column
        :label="$t('users.character')"
        width="250px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.character }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        :label="$t('users.action')"
        align="center"
        width="300"
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
            @click="showConfirmDialog"
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
              <el-button @click="cancelDelete">取消</el-button>
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
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
    <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempUsersData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
    >
      <!-- 登录用户名 -->
        <el-form-item :label="$t('users.name')">
          <el-input
            v-model="tempUsersData.name"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item :label="$t('users.cryptology')">
          <el-input
            v-model="tempUsersData.cryptology"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 创建时间 -->
        <el-form-item :label="$t('users.create_time')">
          <el-input
            v-model="tempUsersData.create_time"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 用户角色 -->
        <el-form-item :label="$t('users.character')">
          <el-input
            v-model="tempUsersData.character"
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
          @click="updateData()"
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
import { getUsers, updateUser, defaultUsersData, deleteUser  } from '@/api/users'
import { EvidenceChainData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
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
  private list: EvidenceChainData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page_id: 1,
    limit: 20,
    // importance: undefined,
    table_id: 5,
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
  private pageviewsData = []
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  }

  private downloadLoading = false
  private tempUsersData = defaultUsersData

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getUsers(this.listQuery)
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
  private showConfirmDialog(){
    this.confirmDialogVisible=true
  }
    private handleConfirmDialogClose(){
    this.confirmDialogVisible=false
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

  private resetTempArticleData() {
    this.tempUsersData = cloneDeep(defaultUsersData)
  }


  private handleUpdate(row: any) {
    this.tempUsersData = Object.assign({}, row)
    // this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        // this.tempArticleData=.unshift(data.article)
        const tempData = Object.assign({}, this.tempUsersData)
        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateUser({table_ID:this.listQuery.table_id, tempData_ID: this.tempUsersData.id, article: tempData })
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
    deleteUser({ tableId: this.listQuery.table_id, itemId: row.id })
    // this.$notify({
      // title: 'Success',
      // message: 'Delete Successfully',
      // type: 'success',
      // duration: 2000
    // })
    this.confirmDialogVisible=false
    this.list.splice(index, 1)
  }
  private cancelDelete(){
    this.confirmDialogVisible=false
  }
}
</script>
