<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElButton, ElInput, ElOption, ElSelect } from 'element-plus'
import type { Account } from '../model/account.types'
import { useAccountStore } from '../model/account.store'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps<{ account: Account }>()
const store = useAccountStore()

const local = ref<Account>({ ...props.account })

const errors = ref({
  login: false,
  password: false,
})

const labelInput = ref('')

function onLabelBlur() {
  parseLabels(labelInput.value)
}

watch(
  () => local.value.type,
  (type) => {
    if (type === 'LDAP') {
      local.value.password = null
    }
  },
)

function parseLabels(value: string) {
  local.value.labels = value
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

function validateAndSave() {
  errors.value.login = !local.value.login
  errors.value.password = local.value.type === 'LOCAL' && !local.value.password

  if (!errors.value.login && !errors.value.password) {
    store.updateAccount(local.value)
  }
}
</script>

<template>
  <div class="account">
    <ElInput v-model="labelInput" placeholder="Метка" maxlength="50" @blur="onLabelBlur" />

    <ElSelect v-model="local.type" @change="validateAndSave">
      <ElOption label="LDAP" value="LDAP" />
      <ElOption label="Локальная" value="LOCAL" />
    </ElSelect>

    <ElInput
      v-model="local.login"
      placeholder="Логин"
      :class="{ error: errors.login }"
      @blur="validateAndSave"
      maxlength="100"
    />

    <ElInput
      v-if="local.type === 'LOCAL'"
      v-model="local.password"
      placeholder="Пароль"
      type="password"
      :class="{ error: errors.password }"
      @blur="validateAndSave"
    />

    <ElButton class="btn" type="danger" @click="store.removeAccount(local.id)" :icon="Delete" />
  </div>
</template>

<style scoped>
.account {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.error {
  border: 1px solid red;
}
.btn {
  width: max-content;
}
</style>
