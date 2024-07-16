<template>
  <div class="flex h-full gap-2">
    <div class="w-1/4 h-full card">
      <el-scrollbar>
        <el-tree :data="treeData" :props="defaultProps" default-expand-all></el-tree>
      </el-scrollbar>
    </div>
    <div class="flex flex-col flex-1 h-full overflow-scroll card">
      <el-form inline :model="searchForm">
        <el-form-item>
          <el-button type="primary" @click="openUserEditor('创建')">创建用户</el-button>
        </el-form-item>
        <el-form-item prop="keyword">
          <el-input v-model="searchForm.keyword" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <template v-if="tableData.list.length">
        <el-table :data="tableData.list" v-loading="tableData.tableLoading" class="h-full">
          <el-table-column label="用户名" prop="userName" min-width="120"></el-table-column>
          <el-table-column label="姓名" prop="nickName" min-width="100"></el-table-column>
          <el-table-column label="部门" prop="deptName" min-width="100"></el-table-column>
          <el-table-column label="岗位" prop="posts" min-width="120">
            <template #default="{ row }">
              {{ getPosts(row) }}
            </template>
          </el-table-column>
          <el-table-column label="电话" prop="phoneNumber" min-width="140"></el-table-column>
          <el-table-column label="状态" prop="status" min-width="180">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-text="正常"
                inactive-text="停用"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createdTime" min-width="200"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="150">
            <template #default="{ row }">
              <el-button type="primary" link @click="openDrawer('查看', row)">查看</el-button>
              <el-button type="primary" link @click="openUserEditor('编辑', row)">编辑</el-button>
              <el-button type="danger" link @click="deleteUser(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end">
          <el-pagination
            v-model:current-page="searchForm.current"
            v-model:page-size="searchForm.pageSize"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="mt-4"
            background
          />
        </div>
      </template>
      <el-empty v-else />
    </div>
  </div>
  <UserEditor ref="userEditorRef" />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { deptTreeApi } from '@/services/modules/system/dept'
import { TableApi, AddUserApi, UpdateUserApi } from '@/services/modules/system/userBasicInfo'
import { UserBasicInfo, Dept } from '@/services/interface'
import UserEditor from './components/UserEditor.vue'
import useSearchForm from '@/hooks/useSearchForm'
import { useHandleData } from '@/hooks/useHandleData'

const defaultProps = {
  children: 'children',
  label: 'deptName'
}
const treeData = ref<Dept.DeptTree[]>([])
const getTreeData = async () => {
  const { data } = await deptTreeApi({ currentPage: 1, pageSize: 999 })
  treeData.value = data.dataList as unknown as Dept.DeptTree[]
}

type QueryParams = {
  keyword: string
  current: number
  pageSize: number
}
const { searchForm, resetSearchForm } = useSearchForm<QueryParams>({
  keyword: '',
  current: 1,
  pageSize: 10
})

interface TableData {
  list: UserBasicInfo.Table[]
  tableLoading: boolean
  totalCount: number
}
const tableData = reactive<TableData>({
  list: [],
  tableLoading: false,
  totalCount: 0
})
const getTableData = async () => {
  tableData.tableLoading = true
  try {
    const { data } = await TableApi({ deptId: '', ...searchForm })
    tableData.list = data.dataList
    tableData.totalCount = data.totalCount
    tableData.tableLoading = false
  } catch (error) {
    tableData.tableLoading = false
  }
  return tableData.list
}

const handleSizeChange = (pageSize: number) => {
  searchForm.pageSize = pageSize
  getTableData()
}

const handleCurrentChange = (current: number) => {
  searchForm.current = current
  getTableData()
}

const handleReset = () => {
  resetSearchForm()
  getTableData()
}

const getPosts = (row: UserBasicInfo.Table) => {
  return row.posts.length ? row.posts[0].postName : '--'
}

const userEditorRef = ref<InstanceType<typeof UserEditor> | null>(null)
const openUserEditor = (title: string, row: Partial<UserBasicInfo.Table> = {}) => {
  const params = {
    title: `${title}用户`,
    deptList: treeData.value,
    userInfo: row,
    api: title === '创建' ? AddUserApi : UpdateUserApi
  }
  userEditorRef.value?.acceptParams(params)
}

const deleteUser = (row: UserBasicInfo.Table) => {
  useHandleData('确认删除?', TableApi, '删除', { deptId: '', ...searchForm })
}

onMounted(() => {
  getTreeData()
  getTableData()
})
</script>

<style scoped></style>
