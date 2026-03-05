<script setup lang="ts">
const { theme } = useThemeMode()

useHead(() => ({
  htmlAttrs: {
    class: `theme-${theme.value}`,
    lang: "en",
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
