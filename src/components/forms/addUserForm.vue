<template>
  <form @click.prevent class="new-user-form">
    <div class="new-user-form__input-wrap">
      <input-component placeholder="name" v-model="newUser.name.first" />
      <span v-if="v$.name.first.$error && !!v$.$touch" class="error-label">Введеное некорректное имя</span>
    </div>

    <div class="new-user-form__input-wrap">
      <select-component :name="'gender'" v-model="newUser.gender">
        <option value="male">male</option>
        <option value="female">female</option>
      </select-component>
      <span v-if="v$.gender.$error" class="error-label">Выберите пол</span>
    </div>

    <div class="new-user-form__input-wrap">
      <input-component type="email" placeholder="email" v-model="newUser.email" />
      <span v-if="v$.email.$error" class="error-label">Введен некорректный email</span>
    </div>

    <div class="new-user-form__input-wrap">
      <input-component type="number" placeholder="18" v-model="newUser.dob.age" />
      <span v-if="v$.dob.age.$error" class="error-label">Некорректный возраст</span>
    </div>

    <add-button @click="createNewUser" />
  </form>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { minLength, maxLength, required, email, numeric } from '@vuelidate/validators'

import { UserService } from '../users/service/user.service'

import inputComponent from '../ui/inputs/inputComponent.vue'
import selectComponent from '../ui/selects/selectComponent.vue'
import addButton from '../ui/buttons/addButton.vue'

import type User from '../users/types/user.interface'

const newUser: Ref<User> = ref({
  name: {
    first: '',
  },
  gender: '',
  email: '',
  dob: {
    age: ''
  },
})

const rules = computed(() => ({
  name: {
    first: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20)
    }
  },
  gender: {
    required,
  },
  email: {
    required,
    email,
    minLength: minLength(2),
    maxLength: maxLength(30)
  },
  dob: {
    age: {
      required,
      numeric,
      minLength: minLength(2),
      maxLength: maxLength(2)
    },
  },
}))

const v$ = useVuelidate(rules, newUser)

const createNewUser = async () => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return
  }

  const res = await UserService.set()
    .toServer(newUser.value)

  if (res.status) {
    newUser.value = {
      name: {
        first: '',
      },
      gender: '',
      email: '',
      dob: {
        age: ''
      },
    };
  }

  v$.value.$reset()
}
</script>

<style scoped lang="scss">
.new-user-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &__input-wrap {
    display: flex;
    flex-direction: column;

    select {
      height: 36px;
    }
  }

  button {
    height: 36px;
  }

  &>* {
    margin: 5px;
    padding: 5px 10px;
    border-radius: 3px;
  }
}

.error-label {
  color: red;
  font-size: 0.875rem;
}
</style>