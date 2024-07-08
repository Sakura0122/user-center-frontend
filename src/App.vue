<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<template>
  <a-spin id="ant-spin" />
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<style scoped lang="scss">
#ant-spin {
  display: none;
}
</style>
