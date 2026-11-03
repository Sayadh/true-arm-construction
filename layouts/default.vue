<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main id="main" class="flex-1 pb-20 sm:pb-0">
      <slot />
    </main>
    <SiteFooter />
    <MobileActionBar />
  </div>
</template>
