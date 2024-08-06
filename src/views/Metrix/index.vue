<template>
  <div class="metrix-container size-full">
    <div class="h-full bg-white left">
      <div
        v-for="item in menuData"
        :key="item.id"
        class="menu-item"
        :class="{ active: state.activeId === item.id }"
        @click="handleLeftMenuClick(item)"
      >
        {{ item.CPMC }}
      </div>
    </div>
    <div class="right">
      <div class="mb-4 tabs">
        <el-tabs stretch>
          <el-tab-pane v-for="(item, index) in tabsList" :key="index">
            <template #label>
              <a :href="`#${item.id}`">
                <div>
                  {{ item.title }}
                </div>
              </a>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-scrollbar
        wrap-class="flex-1 min-h-0"
        view-class="flex flex-col gap-4 whitespace-pre-wrap"
      >
        <div class="box" id="tab0">
          <h1>产品介绍</h1>
          <div>{{ menuItemData.CPJJ }}</div>
        </div>
        <div class="box" id="tab1">
          <h1>产品优势及亮点</h1>
          <div>{{ menuItemData.MBKH }}</div>
        </div>
        <div class="box" id="tab2">
          <h1>目标客户</h1>
          <div>{{ menuItemData.textarea_1719457546314 }}</div>
        </div>
        <div class="box" id="tab3">
          <h1>应用场景</h1>
          <div>{{ menuItemData.YYCJ }}</div>
        </div>
        <div class="box" id="tab4">
          <h1>商业模式</h1>
          <div>{{ menuItemData.SYMS }}</div>
        </div>
        <div class="box" id="tab5">
          <h1>最佳实践</h1>
          <div>{{ menuItemData.CPJJ }}</div>
        </div>
        <div class="box" id="tab6">
          <h1>产品资料</h1>
          <div>{{ menuItemData.MBKH }}</div>
        </div>
        <div class="box" id="tab7">
          <h1>产品团队</h1>
          <div>{{ menuItemData.textarea_1719457546314 }}</div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { MenuType } from './interface'
import { tabsList } from './assets/index'

interface StateType {
  activeId: string
}
const state = reactive<StateType>({
  activeId: ''
})
const menuData = ref<MenuType[]>([])
const menuItemData = computed<Partial<MenuType>>(() => {
  return menuData.value.find((item) => item.id === state.activeId) || {}
})

const handleLeftMenuClick = (item: MenuType) => {
  state.activeId = item.id
  console.log('activeId', state.activeId)
}

const getData = async () => {
  const res = await axios.get('wikipedia-api/wb/datamodel/run/13/json')
  menuData.value = res.data.data
  state.activeId = menuData.value[0].id
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss">
.el-scrollbar__wrap--hidden-default {
  /* scroll-behavior: smooth; */
}
</style>
<style lang="scss" scoped>
.metrix-container {
  background-image: url('@/assets/images/wikipedia/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
  .left {
    width: 254px;
    .menu-item {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      color: rgba($color: #38384a, $alpha: 64%);
      cursor: pointer;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .active {
      color: #fff;
      background-image: url('@/assets/images/wikipedia/button.png');
    }
  }
  .right {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    padding: 18px;
    overflow: hidden;
    .tabs {
      width: 100%;
      height: 80px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &-label {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        // color: #474960;
        font-weight: 500;
      }
    }
    .box {
      width: 100%;
      padding: 20px;
      background-image: linear-gradient(
        211deg,
        rgba($color: #f7faff, $alpha: 76%) 8%,
        rgba($color: #fefefe, $alpha: 76%) 53%
      );
      backdrop-filter: blur(3px);
      border: 2px solid rgb(255 255 255 / 76%);
      border-radius: 6px;
      box-shadow:
        0 2px 4px 0 rgb(207 215 243 / 54%),
        0 6px 21px 0 rgb(179 193 228 / 48%);
    }
  }
}
</style>
