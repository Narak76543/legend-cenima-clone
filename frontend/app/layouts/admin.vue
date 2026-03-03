<template>
  <div class="flex min-h-screen flex-col bg-[#f3f4f6] text-slate-900 xl:flex-row">
    <AdminSidebar />

    <div class="flex min-h-screen min-w-0 flex-1 flex-col">
      <AdminHeader />
      <main class="flex-1 px-4 pb-6 sm:px-6 sm:pb-8 md:px-7 lg:px-8">
        <slot />
      </main>
    </div>
  </div>
</template>
