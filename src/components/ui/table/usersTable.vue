<template>
  <v-container>
    <v-data-table :headers="headers" :items="users" class="elevation-1" hide-default-footer>

      <template v-slot:item.action="{ item }">
        <deleteButton @click="deleteUser(item)" />
      </template>

    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { UserService } from '@/components/users/service/user.service'

import deleteButton from '@/components/ui/buttons/deleteButton.vue'

import type User from '@/components/users/types/user.interface'

const prop = defineProps({
  users: Array<User>,
})

const headers = [
  { title: 'Name', value: 'name.first' },
  { title: 'Gender', value: 'gender' },
  { title: 'Email', value: 'email' },
  { title: 'Age', value: 'dob.age' },
  { title: 'Action', value: 'action', sortable: false }
];

const deleteUser = (user: Object) => {
  UserService.set()
    .removeUser(user)
}
</script>

<style lang="scss">
.v-data-table-header th {
  text-align: left;
}

thead>tr>th {
  background-color: #FAFAFA;
  border-right: outset 1px #D8D9D9;

  &:last-child {
    border-right: none;
  }
}
</style>
