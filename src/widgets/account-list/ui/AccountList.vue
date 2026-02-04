<script setup lang="ts">
import { onMounted } from 'vue'
import { useAccountStore } from '@/entities/account/model/account.store'
import AccountItem from '@/entities/account/ui/AccountItem.vue'

const store = useAccountStore()

onMounted(() => store.load())
</script>

<template>
  <AccountItem v-for="account in store.accounts" :key="account.id" :account="account" />
</template>
