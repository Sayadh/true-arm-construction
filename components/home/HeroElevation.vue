<template>
  <!--
    Decorative architectural elevation drawing used until a real hero photo is supplied.
    Lines "draw" once on load (disabled for reduced motion).
  -->
  <svg viewBox="0 96 480 400" class="elevation h-auto w-full" role="img" aria-label="Line drawing of a house elevation">
    <g fill="none" stroke="#E8E5DF" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">
      <!-- ground -->
      <path class="ln" d="M20 420 H460" stroke-opacity=".55" />
      <!-- main volume -->
      <path class="ln" d="M75 420 V228 H325 V420" />
      <!-- gable roof -->
      <path class="ln" d="M58 238 L200 120 L342 238" />
      <path class="ln" d="M75 228 L200 132 L325 228" stroke-opacity=".35" />
      <!-- wing -->
      <path class="ln" d="M325 420 V318 H432 V420" />
      <path class="ln" d="M318 320 L442 300" />
      <!-- upper windows -->
      <rect class="ln" x="108" y="262" width="58" height="70" />
      <path class="ln" d="M137 262 V332 M108 297 H166" stroke-opacity=".45" />
      <rect class="ln" x="234" y="262" width="58" height="70" />
      <path class="ln" d="M263 262 V332 M234 297 H292" stroke-opacity=".45" />
      <!-- gable window -->
      <circle class="ln" cx="200" cy="190" r="14" stroke-opacity=".7" />
      <!-- lower: window + door -->
      <rect class="ln" x="100" y="352" width="92" height="56" />
      <path class="ln" d="M146 352 V408" stroke-opacity=".45" />
      <rect class="ln" x="236" y="342" width="48" height="78" />
      <path class="ln" d="M274 384 h0.1" stroke-width="3" />
      <!-- floor line -->
      <path class="ln" d="M75 345 H100 M192 345 H236 M284 345 H325" stroke-opacity=".25" stroke-dasharray="3 5" />
      <!-- wing cladding lines + window -->
      <path class="ln" d="M325 336 H432 M325 352 H432 M325 368 H432 M325 384 H432 M325 400 H432" stroke-opacity=".18" />
      <rect class="ln" x="352" y="344" width="54" height="40" fill="#101719" />
    </g>

    <!-- dimension lines -->
    <g stroke="#B88957" stroke-width="1" fill="none">
      <path class="ln dim" d="M75 455 H432 M75 447 V463 M432 447 V463 M325 451 V459" />
      <path class="ln dim" d="M462 120 V420 M454 120 H470 M454 420 H470 M456 228 H468" />
      <path class="ln dim" d="M30 228 V420 M22 228 H38 M22 420 H38" stroke-opacity=".6" />
    </g>
    <g fill="#CFA67A" font-family="inherit" font-size="12" font-weight="600">
      <text x="196" y="478" text-anchor="middle" class="lbl">Built around your vision</text>
    </g>
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .elevation .ln {
    stroke-dasharray: 900;
    stroke-dashoffset: 900;
    animation: draw 1.8s cubic-bezier(.2, .7, .2, 1) forwards;
  }
  .elevation .ln.dim { animation-delay: 0.9s; }
  .elevation .lbl { opacity: 0; animation: fade 0.6s ease-out 1.8s forwards; }
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes fade { to { opacity: 1; } }
</style>
