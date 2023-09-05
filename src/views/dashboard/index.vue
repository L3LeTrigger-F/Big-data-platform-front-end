<template slot-scope="scope">
    <div class="app-container">
    <div class="filter-container">
      <el-row>
          <el-row>
            <el-col :span="12">
              <!-- 搜索框 逻辑是输入什么根据下面的button，默认是日志数据搜索 -->
            <el-input
            v-model="listQuery.title"
            :placeholder="请输入内容"
            class="filter-item"
            style="margin-top:42px;margin-left:5%;border:0.8px solid #101110"
            >
            </el-input>
            </el-col>
            <el-col :span="12">
              <!-- 搜索按钮 -->
              <el-button
              v-waves
              type="success"
              class="el-button-search"
              style="margin-top:40px;margin-left:12%"
              @click="handleFilter"
              >
              搜索
              </el-button>
              <!-- 查询语法 -->
              <el-button
              v-waves
              type="primary"
              class="button-grammar el-button-search"
              style="margin-top:40px;"
              @click="handleGrammar"
              >
              查询语法
              </el-button>
            </el-col>
          </el-row>
      <el-row type="flex" align="middle" style="margin-top:20px;margin-left:3%">
        <el-button v-waves round  size="medium" style="top:30%" class="el-button-fi" @click="selectedType = 'type1'">日志数据</el-button>
        <el-col :span="1"></el-col><el-button round size="medium"  class="el-button-fi" @click="selectedType = 'type2'">关联规则</el-button>
        <el-col :span="1"></el-col><el-button round size="medium" class="el-button-fi" @click="selectedType = 'type3'">证据链</el-button>
      </el-row>
    </el-row>
     </div>
    <el-table
    :data="tableData"
    :columns="columns"
    v-if="showTable"
    >
    <el-table-column v-for="(value, key) in tableData[0]" :key="key" :label="key">
      <template slot-scope="scope">
          {{ scope.row[key] }}
        </template>
      </el-table-column>

    </el-table>
    <div v-else class="no-data">暂无数据</div>
        <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
      </div>
      <!-- <component :is="currentRole" /> -->

  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles,getContext,getGrammar} from '@/api/articles'
import { EvidenceChainData,DialogData,EvidenceData } from '@/api/types'
import { getEvidences} from '@/api/evidence'
import { getDialogs} from '@/api/dialogs'
import { UserModule } from '@/store/modules/user'
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
    private listLoading = true
    private total = 0
    private column:any[]=[]
    private showTable=false
    private listQuery = {
    page_id: 1,
    limit: 20,
    table_id: 2,
    title: undefined,
    type: undefined,
    sort: '+id'
  }
    private selectedType=''
    private tableData: any[] = [];
    created() {
      this.getList()
    }
    private async getList(){
    this.listLoading=true
    if(this.selectedType=="type1")
      this.listQuery.table_id=1
    else if(this.selectedType=="type2")
      this.listQuery.table_id=2
    else if(this.selectedType=="type3")
      this.listQuery.table_id=3
    const { data } = await getContext(this.listQuery)
    this.tableData=data.items
    this.total = data.total
     setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
    }
  private handleFilter() {
    this.listQuery.page_id = 1
    this.getList()
    this.showTable=true
}
  private async handleGrammar(){
    const {data}=await getGrammar({table_id:this.listQuery.table_id})
    this.getList()
    this.showTable=true
  }
}
</script>
<style lang="scss" scoped>
.button-container {
  display: block;
  margin:0 auto
}
.el-button-fi{
  font-size:20px;
  width:160px;
  border-color: rgb(56, 67, 67);
  border-width: 2;
}
.el-button-search{
  font-size:18px;
  width:180px;
}
.no-data{
  font-size:50px;
  width:200px;
  margin-left:40%;
  margin-top:8%;
  margin-bottom: 18%;
  color: rgb(115, 110, 110);
}
</style>

