<script setup lang="ts">
import { ref } from 'vue'
import { useLogout } from '@/features/session/logout'
import { UserSettingsForm } from '@/features/user/update-user-settings'
import { useAccessLevelRedirect } from '@/entities/session'
import UIErrorMessages from '@/shared/ui/UIErrorMessages.vue'

useAccessLevelRedirect()

const errorMessages = ref<string[]>([])
const { logout: onLogout } = useLogout()
</script>

<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <UIErrorMessages v-if="errorMessages.length" :messages="errorMessages" />

          <UserSettingsForm @error="errorMessages = $event" />
          <hr />
          <button @click="onLogout" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>
