<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
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
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.reviewer') }}
      </el-checkbox>
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
      <!-- 日志记录时间 -->
      <el-table-column
        :label="$t('table.date')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
      <!-- 日志名 -->
      <el-table-column
        :label="$t('table.title')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>

      <!-- 日志描述 -->
      <el-table-column
        :label="$t('table.title')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 日志分类 -->
      <el-table-column
        :label="$t('table.title')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 日志等级 -->
      <el-table-column
        :label="$t('table.title')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 设备编号 -->
      <el-table-column
        :label="$t('table.title')"
        min-width="150px"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 设备名称 -->
      <el-table-column
        :label="$t('table.author')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <!-- 审核人 -->
      <el-table-column
        v-if="showReviewer"
        :label="$t('table.reviewer')"
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <!-- 重要性 -->
      <!-- <el-table-column -->
        <!-- :label="$t('table.importance')" -->
        <!-- width="105px" -->
      <!-- > -->
        <!-- <template slot-scope="{row}"> -->
          <!-- <svg-icon -->
            <!-- v-for="n in +row.importance" -->
            <!-- :key="n" -->
            <!-- name="star" -->
            <!-- class="meta-item__icon" -->
          <!-- /> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
      <!-- <el-table-column -->
        <!-- :label="$t('table.readings')" -->
        <!-- align="center" -->
        <!-- width="95" -->
      <!-- > -->
        <!-- <template slot-scope="{row}"> -->
          <!-- <span -->
            <!-- v-if="row.pageviews" -->
            <!-- class="link-type" -->
            <!-- @click="handleGetPageviews(row.pageviews)" -->
          <!-- >{{ row.pageviews }}</span> -->
          <!-- <span v-else>0</span> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
      <!-- <el-table-column -->
        <!-- :label="$t('table.status')" -->
        <!-- class-name="status-col" -->
        <!-- width="100" -->
      <!-- > -->
        <!-- <template slot-scope="{row}"> -->
          <!-- <el-tag :type="row.status | articleStatusFilter"> -->
            <!-- {{ row.status }} -->
          <!-- </el-tag> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
      <!-- 操作 -->
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
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
        :model="tempArticleData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
      <!-- 类型 -->
        <el-form-item
          :label="$t('table.type')"
          prop="type"
        >

          <el-select
            v-model="tempArticleData.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.displayName"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item -->
          <!-- :label="$t('table.date')" -->
          <!-- prop="timestamp" -->
        <!-- > -->
          <!-- <el-date-picker -->
            <!-- v-model="tempArticleData.timestamp" -->
            <!-- type="datetime" -->
            <!-- placeholder="Please pick a date" -->
          <!-- /> -->
        <!-- </el-form-item> -->
        <!-- 标题 -->
        <el-form-item
          :label="$t('table.title')"
          prop="title"
        >
          <el-input v-model="tempArticleData.title" />
        </el-form-item>
        <!-- 状态 -->
        <!-- <el-form-item :label="$t('table.status')"> -->
          <!-- <el-select -->
            <!-- v-model="tempArticleData.status" -->
            <!-- class="filter-item" -->
            <!-- placeholder="Please select" -->
          <!-- > -->
            <!-- <el-option -->
              <!-- v-for="item in statusOptions" -->
              <!-- :key="item" -->
              <!-- :label="item" -->
              <!-- :value="item" -->
            <!-- /> -->
          <!-- </el-select> -->
        <!-- </el-form-item> -->
        <!-- 重要性 -->
        <!-- <el-form-item :label="$t('table.importance')"> -->
          <!-- <el-rate -->
            <!-- v-model="tempArticleData.importance" -->
            <!-- :colors="['#99A9BF', '#F7BA2A', '#FF9900']" -->
            <!-- :max="3" -->
            <!-- style="margin-top:8px;" -->
          <!-- /> -->
        <!-- </el-form-item> -->
        <!-- 评论 -->
        <el-form-item :label="$t('table.remark')">
          <el-input
            v-model="tempArticleData.abstractContent"
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
import { getPageviews } from '@/api/articles'
import { getDialogs, createDialogs, defaultDialogsData, updateDialogs } from '@/api/dialogs'
import { DialogData, EvidenceChainData } from '@/api/types'
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
  // 指令
  filters: {
    // 状态过滤器。动态改变table种status值
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})
export default class extends Vue {
  // 用于优化table渲染
  private tableKey = 0
  // 用于存储需要显示的数据
  private list: EvidenceChainData[] = []
  private dialogs:DialogData[] =[]
  // 用于存储数据总条数
  private total = 0
  // 用于控制数据加载
  private listLoading = true
  // 用于存储数据查询数据
  private listQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: '+id'
  }

  // 重要程度级别
  private importanceOptions = [1, 2, 3]
  // 语言类型选项
  private calendarTypeOptions = calendarTypeOptions
  // 排序选项
  private sortOptions = [
    { label: 'ID Ascending', key: '+id' },
    { label: 'ID Descending', key: '-id' }
  ]

  // private statusOptions = ['published', 'draft', 'deleted']
  // 控制显示评论者
  private showReviewer = false
  // 模态框可见状态
  private dialogFormVisible = false
  // 模态框操作状态
  private dialogStatus = ''
  // 用于控制操作状态
  private textMap = {
    update: 'Edit',
    create: 'Create'
  }

  // 阅读统计可见状态
  private dialogPageviewsVisible = false
  // 阅读数据
  private pageviewsData = []
  // 验证规则
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }], // 应用于change事件
    timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }] // 应用于焦点事件
  }

  private downloadLoading = false
  private tempDialogsData = defaultDialogsData
  // 实例被创建后执行
  // 这个是在Vue组件实例创建后，created()钩子函数会被自动调用，从而执行其中的代码逻辑。
  // 这样可以在组件初始化时执行一些需要在组件创建后立即执行的操作。
  created() {
    this.getList()
  }

  // 获取数据的
  private async getList() {
    this.listLoading = true
    // 获取数据
    // const { data } = await getArticles(this.listQuery)
    const { data } = await getDialogs(this.listQuery)
    // 获取到的数据
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  // 用于查询等重新获取数据操作
  private handleFilter() {
    this.listQuery.page = 1
    this.getList()
  }

  // 修改状态处理，用于table表格动态修改status值
  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: '操作成功',
      type: 'success'
    })
    row.status = status
  }

  // 排序更改，用于根据id升序或降序
  private sortChange(data: any) {
    const { prop, order } = data
    if (prop === 'id') {
      this.sortByID(order)
    }
  }

  // id排序
  private sortByID(order: string) {
    if (order === 'ascending') {
      this.listQuery.sort = '+id'
    } else {
      this.listQuery.sort = '-id'
    }
    // 重新获取数据
    this.handleFilter()
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort
    return sort === `+${key}` ? 'ascending' : 'descending'
  }

  // 这里！！！！！！！！！！！！！！！！！！！！！！！！
  private resetTempDialogsData() {
    this.tempDialogsData = cloneDeep(defaultDialogsData)
  }

  // 新增前处理
  private handleCreate() {
    // 重设默认值
    this.resetTempDialogsData()
    // 设置模态框操作状态为新增
    this.dialogStatus = 'create'
    // 设置模态框可见
    this.dialogFormVisible = true
    // $nextTick：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
    // 使用nextTick可立即使用更完的DOM
    this.$nextTick(() => {
      // 移除表单校验结果
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  // 新增数据
  private createData() {
    // 表单验证
    (this.$refs.dataForm as Form).validate(async(valid) => {
      // 验证通过执行
      if (valid) {
        const DialogsData = this.tempDialogsData
        DialogsData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        // 设置作者
        // articleData.author = 'vue-typescript-admin'
        // 新增接口
        const { data } = await createDialogs({ dialogs: DialogsData })
        data.dialogs.timestamp = Date.parse(data.dialogs.timestamp)
        // 追加新增数据
        this.list.unshift(data.dialogs)
        // 模态框不可见
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

  //  更新前预处理
  private handleUpdate(row: any) {
    // 复制需要更新的内容
    this.tempDialogsData = Object.assign({}, row)
    // 时间戳转换
    this.tempDialogsData.timestamp = +new Date(this.tempDialogsData.timestamp)
    // 设置操作状态为更新
    this.dialogStatus = 'update'
    // 模态框可见
    this.dialogFormVisible = true
    this.$nextTick(() => {
      // 清除表单验证结果
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  // 更新数据
  private updateData() {
    (this.$refs.dataForm as Form).validate(async(valid) => {
      if (valid) {
        // Object.assign(target, source1, source2)方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）。
        // 合并对象
        const tempData = Object.assign({}, this.tempDialogsData)
        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateDialogs(tempData.id, { dialogs: tempData })
        // const { data } = await updateArticle(tempData.id, { article: tempData })
        // 查找目标元素，返回元素位置，找不到就返回-1
        const index = this.list.findIndex(v => v.id === data.article.id)
        /// / 通过删除或替换现有元素或者原地添加新的元素来修改数组,
        // 并以数组形式返回被修改的内容。此方法会改变原数组
        this.list.splice(index, 1, data.article)
        // 模态框不可见
        this.dialogFormVisible = false
        // 消息弹框
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
    // 删除数组中指定元素
    this.list.splice(index, 1)
  }

  // 阅读统计处理
  private async handleGetPageviews(pageviews: string) {
    // 请求获取统计数据
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    // 设置统计模态框可见
    this.dialogPageviewsVisible = true
  }

  // 下载处理
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
