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
      <!-- 选择类型 -->
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
        width="120"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <!-- 显示证据链头-->
      <el-table-column
        :label="$t('table.evi_head')"
        width="250px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence_head_id }}</span>
        </template>
      </el-table-column>

      <!-- 证据链id -->
      <el-table-column
        :label="$t('table.evi_id')"
        min-width="300px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
            @click="showdialogForm(row.id)"
          >{{ row.evidence_id }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 证据链尾 -->
      <el-table-column
        :label="$t('table.evi_tail')"
        width="250px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.evidence_tail_id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="300"
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
        :model="detailData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
    >
      <!-- 证据链头 -->
        <el-form-item :label="$t('table.evi_head')">
          <el-input
            v-model="detailData.evidence_head_id"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 证据链尾 -->
        <el-form-item :label="$t('table.evi_tail')">
          <el-input
            v-model="detailData.evidence_tail_id"
            :autosize="{minRows: 1, maxRows: 1}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <!-- 评论 -->
        <el-form-item :label="$t('table.remark')">
          <el-input
            v-model="detailData.evidence_id"
            :autosize="{minRows: 2, maxRows: 4}"
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
import { getArticles, getPageviews, createArticle,detailArticles, updateArticle, defaultArticleData, deleteArticle } from '@/api/articles'
import { EvidenceChainData } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'


// arr to obj, such as { CN : "China", US : "USA" }

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
export default class extends Vue {
  private tableKey = 0
  private list: EvidenceChainData[] = []
  private total = 0
  private listLoading = true
  private listQuery = {
    page_id: 1,
    limit: 20,
    // importance: undefined,
    table_id: 4,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  private importanceOptions = [1, 2, 3]
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
  private tempArticleData = defaultArticleData
  private detailData:any[]=[]
  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
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
    this.tempArticleData = cloneDeep(defaultArticleData)
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
        articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        const { data } = await createArticle({ table_id: this.listQuery.table_id, articleData: this.tempArticleData })
        this.list.unshift(this.tempArticleData)
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


  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        // this.tempArticleData=.unshift(data.article)
        const tempData = Object.assign({}, this.tempArticleData)
        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateArticle({tableId:this.listQuery.table_id, tempId: this.tempArticleData.id, article: tempData })
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
    deleteArticle({ tableId: this.listQuery.table_id, itemId: row.id })
    // this.$notify({
      // title: 'Success',
      // message: 'Delete Successfully',
      // type: 'success',
      // duration: 2000
    // })
    this.confirmDialogVisible=false
    this.list.splice(index, 1)
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }
  private cancelDelete(){
    this.confirmDialogVisible=false
  }
  private async showdialogForm(row:any){
    this.dialogFormVisible=true
    this.dialogStatus='update'
    const { data }=await detailArticles({tableId:this.listQuery.table_id, itemId: row})
    this.detailData=data.items
  }
}
</script>
