<template>
  <div class="flex flex-col card">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="参保类" name="1"></el-tab-pane>
        <el-tab-pane label="待遇类" name="2"></el-tab-pane>
        <el-tab-pane label="财务类" name="3"></el-tab-pane>
      </el-tabs>
      <div class="flex">
        <el-select class="w-32"></el-select>
        <el-input class="w-52" placeholder="请输入"></el-input>
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
    </div>

    <template v-if="tableData.list.length">
      <el-table class="mt-4" :data="tableData.list" @selection-change="selectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" type="index" width="55" />
        <el-table-column label="指标名称" prop="name"></el-table-column>
        <el-table-column label="指标编码" prop="addr"></el-table-column>
        <el-table-column label="指标目录" prop="name"></el-table-column>
        <el-table-column label="指标释义" prop="name"></el-table-column>
        <el-table-column label="统计口径(公式)" prop="name"></el-table-column>
        <el-table-column label="指标出处" prop="name"></el-table-column>
        <el-table-column label="统计单位" prop="name"></el-table-column>
        <el-table-column label="指标标签" prop="name"></el-table-column>
        <el-table-column label="填报人" prop="name"></el-table-column>
        <el-table-column label="填报人单位" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="name"></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="120">
          <template #default="{ row }">
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSelection } from '@/hooks/useSelection'

const activeName = ref('all')
const tableData = reactive({
  list: [
    { name: '医疗总费用1', add: '福建', id: '1' },
    { name: '医疗总费用2', add: '广东', id: '2' },
    { name: '医疗总费用3', add: '湖南', id: '3' },
    { name: '医疗总费用4', add: '广西', id: '4' },
    { name: '医疗总费用5', add: '海南', id: '5' },
    { name: '医疗总费用6', add: '浙江', id: '6' },
    { name: '医疗总费用7', add: '上海', id: '7' },
    { name: '医疗总费用8', add: '江西', id: '8' },
    { name: '医疗总费用9', add: '湖北', id: '9' }
  ],
  multipleSelection: [],
  totalCount: 0
})

const searchForm = reactive({
  current: 1,
  pageSize: 10
})

const { selectedIds, selectionChange } = useSelection()
</script>

<style scoped></style>
