<template>
  <header class="flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 xl:flex-row xl:items-center xl:justify-between xl:py-8">
    <!-- Search -->
    <div class="relative w-full xl:max-w-2xl">
      <div class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 sm:left-5 lg:left-6">
        <UIcon name="i-lucide-search" class="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <input
        type="text"
        placeholder="Search products, SKU, invoices..."
        class="h-12 w-full rounded-xl border border-slate-100 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition
               placeholder:text-slate-400 focus:border-slate-200 focus:ring-4 focus:ring-slate-100 sm:h-14 sm:pl-14 sm:pr-6 sm:text-base lg:h-17 lg:pl-16 lg:pr-8 lg:text-[1.1rem]"
      />
    </div>

    <!-- Right -->
    <div class="grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 xl:w-auto xl:flex-nowrap xl:justify-end">
      <div class="col-span-2 flex w-full items-center justify-between gap-1 rounded-full border border-slate-100 bg-white p-1.5 shadow-sm md:w-auto md:min-w-[18rem] md:justify-start">
        <button class="flex-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-transform active:scale-95 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm lg:px-7 lg:py-3 lg:text-[0.95rem]">
          This week
        </button>
        <button class="flex-1 rounded-full px-4 py-2 text-xs font-bold text-slate-400 transition hover:text-slate-600 active:scale-95 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm lg:px-7 lg:py-3 lg:text-[0.95rem]">
          This month
        </button>
      </div>

      <button class="group relative flex h-11 w-full items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 sm:h-12 sm:w-12 sm:rounded-full lg:h-15 lg:w-15">
        <span class="absolute right-3 top-3 h-2 w-2 rounded-full border-2 border-white bg-red-500 sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5" />
        <UIcon name="i-lucide-bell" class="h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
      </button>

      <div class="flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-base font-bold text-slate-600 shadow-sm sm:h-12 sm:w-12 sm:rounded-full lg:h-15 lg:w-15 lg:text-lg">
        AR
      </div>
    </div>
  </header>
</template>
