<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRegister } from '../model/register.composable'

const formData = reactive<{
  username: string
  email: string
  password: string
}>({
  username: '',
  email: '',
  password: ''
})

const { register, errorMessages } = useRegister()

watch(errorMessages, () => emit('error', errorMessages.value))

const onSubmit = () => register(formData)

const emit = defineEmits<{
  (e: 'error', errorMessages: string[]): void
}>()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset class="form-group">
      <input
        v-model="formData.username"
        class="form-control form-control-lg"
        type="text"
        placeholder="Username"
      />
    </fieldset>
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
    <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
  </form>
</template>
