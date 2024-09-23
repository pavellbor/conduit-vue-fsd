<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useSessionStore } from '@/entities/session'
import { useUpdateUserSettings } from '../model/update-user-settings.composable'

type UserSettings = {
  email: string
  username: string
  bio?: string
  image?: string
  password?: string
}

const formData = reactive<UserSettings>({ email: '', username: '' })
const sessionStore = useSessionStore()

const initFormData = () => {
  if (sessionStore.isAuthenticated) {
    Object.assign(formData, sessionStore.user)
  }
}

initFormData()

watch(() => sessionStore.isAuthenticated, initFormData)

const { updateUserSettings, errorMessages } = useUpdateUserSettings()
const onSubmit = () => updateUserSettings(formData)

watch(errorMessages, () => emit('error', errorMessages.value))

const emit = defineEmits<{ (e: 'error', errorMessages: string[]): void }>()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <fieldset class="form-group">
        <input
          v-model="formData.image"
          class="form-control"
          type="text"
          placeholder="URL of profile picture"
        />
      </fieldset>
      <fieldset class="form-group">
        <input
          v-model="formData.username"
          class="form-control form-control-lg"
          type="text"
          placeholder="Your Name"
        />
      </fieldset>
      <fieldset class="form-group">
        <textarea
          v-model="formData.bio"
          class="form-control form-control-lg"
          rows="8"
          placeholder="Short bio about you"
        ></textarea>
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
          placeholder="New Password"
        />
      </fieldset>
      <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
    </fieldset>
  </form>
</template>
