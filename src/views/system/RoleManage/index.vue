<template>
  <div class="flex h-full">
    <div class="flex flex-col w-64 h-full pr-5 card">
      <div class="flex items-center justify-between w-full h-10">
        <div class="text-lg font-semibold">指标</div>
        <div class="flex items-center text-blue-500 cursor-pointer">
          <el-icon><Plus /></el-icon>
          <div class="ml-2">指标</div>
        </div>
      </div>
      <el-input class="my-2" :prefix-icon="Search" placeholder="搜索指标"></el-input>
      <el-tree highlight-current :data="treeData" :props="defaultProps"></el-tree>
    </div>

    <div class="flex-1 h-full pl-5 card">
      <div class="flex items-center justify-between h-10">
        <div class="text-lg font-semibold">全部指标</div>
        <div>
          <el-button :icon="Upload">批量上传指标</el-button>
          <el-button :icon="Plus" type="primary" @click="handleCreate">新建指标</el-button>
        </div>
      </div>
      <div class="flex justify-between mt-2">
        <div class="text-xs">{{}}个指标</div>
        <div class="flex items-center">
          <el-button size="small" :icon="Search">搜索</el-button>
          <el-button size="small">负责人 全部</el-button>
          <el-button size="small">类型 全部</el-button>
          <el-checkbox v-model="checked1" label="只看我负责的" size="small" class="ml-2" />

          <el-dropdown trigger="click" size="large">
            <!-- <el-icon><More /></el-icon> -->
            <el-button size="small" class="ml-2">显示字段</el-button>
            <template #dropdown>
              <el-dropdown-menu class="p-2">
                <!-- <el-dropdown-item> -->
                <div class="w-48">
                  <el-input :prefix-icon="Search" placeholder="搜索"></el-input>
                </div>
                <div class="text-slate-300">显示字段</div>
                <div class="flex">
                  <div></div>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-table :data="tableData" class="h-full mt-3">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="showName" label="指标展示名"></el-table-column>
        <el-table-column prop="name" label="指标名称"></el-table-column>
        <el-table-column prop="time" label="修改时间"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="version" label="版本"></el-table-column>
        <el-table-column prop="person" label="业务负责人"></el-table-column>
        <el-table-column label="操作" width="60">
          <template #default="{ row }">
            <el-dropdown trigger="click" size="large">
              <el-icon><More /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div class="w-32">查看</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="w-32">取消收藏</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="w-32">分享</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="w-32">下线</div>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <div class="w-32">调整类目</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="w-32">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="w-32">复制创建指标</div>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <div class="w-32 text-red-500">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <ChooseType v-model:visible="state.chooseTypeVisible" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus, Search, Upload, More } from '@element-plus/icons-vue'
import ChooseType from './components/ChooseType.vue'

const treeData = ref([
  { id: 1, name: '全部指标' },
  {
    id: 2,
    name: '西藏大屏',
    children: [{ id: '2-1', name: '地区生产总值求和' }]
  },
  { id: 3, name: '未分类' }
])
const defaultProps = {
  children: 'children',
  label: 'name'
}

const tableData = ref([
  {
    showName: '地区生产总值求和',
    name: 'sum_column_3',
    time: '2024-07-30 12:56:46',
    unit: '其他',
    version: 'V2',
    person: 'pbtccn'
  }
])

const state = reactive({
  chooseTypeVisible: false
})

const handleCreate = () => {
  state.chooseTypeVisible = true
}
</script>

<style lang="scss" scoped>
:deep(.el-tree-node__content) {
  height: 40px;
}
</style>
