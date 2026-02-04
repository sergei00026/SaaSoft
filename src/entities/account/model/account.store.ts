import { defineStore } from 'pinia'
import type { Account } from './account.types'

const STORAGE_KEY = 'accounts'

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[],
  }),

  actions: {
    load() {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        this.accounts = JSON.parse(data)
      }
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.accounts))
    },

    addAccount() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: '',
        login: '',
        password: null,
      })
      this.persist()
    },

    updateAccount(updated: Account) {
      const index = this.accounts.findIndex((a) => a.id === updated.id)
      if (index !== -1) {
        this.accounts[index] = updated
        this.persist()
      }
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id)
      this.persist()
    },
  },
})
