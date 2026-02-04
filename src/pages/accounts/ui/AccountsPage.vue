<script setup lang="ts">
import AccountList from '@/widgets/account-list/ui/AccountList.vue'
import AddAccountButton from '@/features/account-create/ui/AddAccountButton.vue'
</script>

<template>
  <div class="wrapper">
    <div class="title-block">
      <h1>Учетные записи</h1>
      <AddAccountButton />
    </div>
    <AccountList />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title-block {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
