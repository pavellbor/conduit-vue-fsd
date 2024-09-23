<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { RegisterForm } from '@/features/session/register'
import { RoutesNames } from '@/shared/constants/router'
import UIErrorMessages from '@/shared/ui/UIErrorMessages.vue'

const errorMessages = ref<string[]>([])
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <RouterLink :to="{ name: RoutesNames.login }">Have an account?</RouterLink>
          </p>

          <UIErrorMessages v-if="errorMessages.length" :messages="errorMessages" />

          <RegisterForm @error="errorMessages = $event" />
        </div>
      </div>
    </div>
  </div>
</template>
