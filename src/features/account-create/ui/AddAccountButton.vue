<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useAccountStore } from '@/entities/account/model/account.store'

const store = useAccountStore()
</script>

<template>
  <ElButton class="btn" type="primary" @click="store.addAccount"> + </ElButton>
</template>
<style scoped>
.btn {
  width: max-content;
}
</style>
