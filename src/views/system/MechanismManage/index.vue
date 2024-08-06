<template>
  <div class="flex flex-col card">
    <el-tabs v-model="searchForm.catalogId" @tab-change="getTableData">
      <el-tab-pane :closable="false" key="all" label="全部" name=""></el-tab-pane>
      <el-tab-pane
        closable
        v-for="item in catalogList"
        :key="item.catalogId"
        :label="item.name"
        :name="item.catalogId"
      ></el-tab-pane>
    </el-tabs>
    <div class="flex">
      <el-select class="w-32"></el-select>
      <el-input class="w-52" placeholder="请输入" v-model="searchForm.keywords"></el-input>
      <el-button type="primary" class="ml-3">查询</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="flex mt-4">
      <el-button type="primary">新建指标口径</el-button>
      <el-button type="primary">下载模板</el-button>
      <el-button type="primary">导入指标口径</el-button>
      <el-button type="primary">导出指标口径</el-button>
      <el-button type="warning" :disabled="!selectedIds.length">批量删除</el-button>
    </div>

    <template v-if="tableData.length">
      <el-table
        class="h-full mt-4"
        v-loading="tableLoading"
        :data="tableData"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" width="55" />
        <el-table-column prop="catalogPath" label="指标目录" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="calNo" label="指标编码" show-overflow-tooltip />
        <el-table-column prop="calName" label="指标名称" width="250" show-overflow-tooltip />
        <el-table-column prop="calStatus" label="启用状态" width="100" show-overflow-tooltip>
          <template #default="{ row }">
            <div v-if="row.calStatus === '0'" style="color: red">停用</div>
            <div v-if="row.calStatus === '1'" style="color: #2459ad">启用</div>
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="指标释义" show-overflow-tooltip width="200" />
        <el-table-column prop="calFrom" label="指标出处" show-overflow-tooltip width="200" />
        <el-table-column
          prop="equations"
          width="200"
          label="统计口径(公式)"
          show-overflow-tooltip
        />
        <el-table-column prop="calUnit" label="统计单位" show-overflow-tooltip />
        <el-table-column prop="createBy" label="填报人" show-overflow-tooltip min-width="100" />
        <el-table-column prop="orgId" label="填报人单位" show-overflow-tooltip min-width="100" />
        <el-table-column prop="createdTime" label="创建时间" width="180">
          <template #default="{ row }">
            <div v-if="row.createdTime">
              <div>{{ row.createdTime.split('T')[0] + '  ' + row.createdTime.split('T')[1] }}</div>
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{ row }">
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <Pagination
          :pageable="pageable"
          :handle-current-change="handleCurrentChange"
          :handle-size-change="handleSizeChange"
        />
      </div>
    </template>
    <el-empty v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Pagination from '@/components/Pagination/index.vue'
import { TableApi, CatalogApi } from '@/services/modules/system/indicator'
import { Indicator } from '@/services/modules/system/interface'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'
import { useSearchForm } from '@/hooks/useSearchForm'

type QueryParams = {
  keywords: string
  catalogId: string
  pageType: string
  caliberId: string
}
const { searchForm, resetSearchForm } = useSearchForm<QueryParams>({
  keywords: '',
  catalogId: '',
  pageType: '0',
  caliberId: ''
})

const {
  tableData,
  getTableData,
  tableLoading,
  resetPagination,
  pageable,
  handleCurrentChange,
  handleSizeChange
} = useTable(TableApi, searchForm)

const activeName = ref('all')
const catalogList = ref<Indicator.Catalog[]>([])
const { selectedIds, selectionChange } = useSelection()

const getCatalogData = async () => {
  const res = await CatalogApi({ disType: '0' })
  catalogList.value = res.data.data
}

onMounted(() => {
  getTableData()
  getCatalogData()
})
</script>

<style scoped></style>
