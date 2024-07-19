<template>
  <div class="card">
    <el-button type="primary" @click="handleIncrese">
      {{ obj.age }}
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
        age: 1
      }
    }
  },
  methods: {
    handleIncrese() {
      this.obj.age += 1
    }
  }
}
</script>
