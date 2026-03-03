<script setup lang="ts">
const { theme } = useThemeMode()
const { language } = useAppLanguage()

useHead(() => ({
  htmlAttrs: {
    class: `theme-${theme.value}`,
    lang: language.value,
  },
}))
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
