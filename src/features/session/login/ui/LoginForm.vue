<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useLogin } from '../model/login.composable'

const formData = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: ''
})

const { login, errorMessages } = useLogin()

watch(errorMessages, () => emit('error', errorMessages.value))

const onSubmit = () => login(formData)

const emit = defineEmits<{
  (e: 'error', errorMessages: string[]): void
}>()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset class="form-group">
      <input
        v-model="formData.email"
        class="form-control form-control-lg"
        type="text"
        placeholder="Email"
      />
    </fieldset>
    <fieldset class="form-group">
      <input
        v-model="formData.password"
        class="form-control form-control-lg"
        type="password"
        placeholder="Password"
      />
    </fieldset>
    <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
  </form>
</template>
