<template>
  <header class="flex flex-col gap-6 px-8 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
    <!-- Search -->
    <div class="relative w-full max-w-2xl">
      <div class="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
        <UIcon name="i-lucide-search" class="h-6 w-6" />
      </div>
      <input
        type="text"
        placeholder="Search products, SKU, invoices..."
        class="h-[4.25rem] w-full rounded-[2rem] border border-slate-100 bg-white pl-16 pr-8 text-[1.1rem] text-slate-700 shadow-sm outline-none transition
               placeholder:text-slate-400 focus:border-slate-200 focus:ring-4 focus:ring-slate-100"
      />
    </div>

    <!-- Right -->
    <div class="flex items-center justify-between gap-6 sm:justify-end">
      <div class="flex items-center gap-1 rounded-full border border-slate-100 bg-white p-1.5 shadow-sm">
        <button class="rounded-full bg-slate-900 px-7 py-3 text-[0.95rem] font-bold text-white shadow-sm transition-transform active:scale-95">
          This week
        </button>
        <button class="rounded-full px-7 py-3 text-[0.95rem] font-bold text-slate-400 transition hover:text-slate-600 active:scale-95">
          This month
        </button>
      </div>

      <button class="group relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white border border-slate-100 text-slate-500 shadow-sm transition hover:bg-slate-50">
        <span class="absolute right-4 top-4 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        <UIcon name="i-lucide-bell" class="h-6 w-6 transition-transform group-hover:scale-110" />
      </button>

      <div class="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-lg font-bold text-slate-600 shadow-sm">
        AR
      </div>
    </div>
  </header>
</template>

