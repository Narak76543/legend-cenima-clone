<template>
  <div class="min-h-screen bg-[#f3f4f6] text-slate-900 xl:flex">
    <AdminSidebar />

    <div class="flex min-h-screen flex-1 flex-col">
      <AdminHeader />
      <main class="flex-1 px-5 pb-8 sm:px-7">
        <slot />
      </main>
    </div>
  </div>
</template>
