<template>
  <svg aria-hidden="true" :style="iconStyle" aria-expanded="false">
    <use :xlink:href="symbolId" :fill="fillColor" />
  </svg>
</template>

<script setup lang="ts" name="iconSvg">
import { CSSProperties, computed } from 'vue'

interface SvgProps {
  prefix?: string // 图标名称前缀 ===> 非必传 (默认"icon")
  name: string // 图标名称
  iconStyle?: CSSProperties //图标样式
  fillColor: string
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: 'icon',
  iconStyle: () => ({
    width: '32px',
    height: '32px'
  }),
  fillColor: '#a8abb2'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
