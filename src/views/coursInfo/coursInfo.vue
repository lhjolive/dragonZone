<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" icon="plus" @click="showCreate" v-if="hasPerm('coursInfo:add')">添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="coursName" label="课程名称" style="width: 60px;"></el-table-column>
      <el-table-column align="center" prop="coursTime" label="上课时间" style="width: 60px;"></el-table-column>
      <el-table-column align="center" prop="teacher" label="教师" style="width: 60px;"></el-table-column>
      <el-table-column align="center" prop="addr" label="上课地点" style="width: 60px;"></el-table-column>

      <el-table-column align="center" label="创建时间" width="170">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理" width="200" v-if="hasPerm('coursInfo:update')">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="showUpdate(scope.$index)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space"  :model="tempCoursInfo" label-position="left" label-width="80px"
               style='width: 300px; margin-left:50px;'>
        <el-form-item label="课程名称">
          <el-input type="text" v-model="tempCoursInfo.coursName">
          </el-input>
        </el-form-item>
        <el-form-item label="上课时间">
          <el-input type="text" v-model="tempCoursInfo.coursTime">
          </el-input>
        </el-form-item>
        <el-form-item label="教师">
          <el-input type="text" v-model="tempCoursInfo.teacher">
          </el-input>
        </el-form-item>
        <el-form-item label="上课地点">
          <el-input type="text" v-model="tempCoursInfo.addr">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="createCoursInfo">创 建</el-button>
        <el-button type="primary" v-else @click="updateArticle">修 改</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 50,//每页条数
          name: ''
        },
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建课程'
        },
        tempCoursInfo: {
          id: "",
          coursName: "",
          coursTime: "",
          teacher: "",
          addr: ""
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        //查询列表
        if (!this.hasPerm('coursInfo:list')) {
          return
        }
        this.listLoading = true;
        this.api({
          url: "/coursInfo/listCoursInfo",
          method: "get",
          params: this.listQuery
        }).then(res => {
          this.listLoading = false;
          this.list = res.data.content;
          this.totalCount = res.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        this.tempCoursInfo = {};
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        //显示修改对话框
        this.tempCoursInfo = this.list[$index];
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      createCoursInfo() {
        console.log(this.tempCoursInfo)
        //保存新文章
        this.api({
          url: "/coursInfo/addCoursInfo",
          method: "post",
          data: this.tempCoursInfo
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
      updateArticle() {
        //修改文章
        this.api({
          url: "/coursInfo/updateCoursInfo",
          method: "post",
          data: this.tempCoursInfo
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
    }
  }
</script>
