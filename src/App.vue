<template>
  <main>
    <add-user-form />
    <usersTable :users="users" />
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'

import { UserService } from './components/users/service/user.service'

import usersTable from './components/ui/table/usersTable.vue'
import addUserForm from './components/forms/addUserForm.vue'

import { useUsersStore } from './stores/users.store'

import type User from './components/users/types/user.interface'

const users = computed<Array<User>>(() => useUsersStore().users)

onBeforeMount(() => {
  UserService.get()
    .fromServer()
})
</script>