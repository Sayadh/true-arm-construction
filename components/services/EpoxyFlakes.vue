<script setup lang="ts">
/**
 * The flake layer of the epoxy comparison. Kept in its own component so the
 * hundreds of flakes are not re-rendered on every frame while the divider moves;
 * they only update when the color changes.
 */
const props = defineProps<{ colors: readonly string[] }>()

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}
const rnd = seeded(5)
const flakes = Array.from({ length: 420 }, () => ({ x: rnd() * 600, y: rnd() * 380, w: 3 + rnd() * 5, rot: Math.round(rnd() * 180), c: Math.floor(rnd() * 4) }))
</script>

<template>
  <g>
    <rect
      v-for="(f, i) in flakes"
      :key="i"
      :x="f.x"
      :y="f.y"
      :width="f.w"
      :height="f.w * 0.55"
      :fill="props.colors[f.c]"
      :transform="`rotate(${f.rot} ${f.x} ${f.y})`"
      opacity=".85"
    />
  </g>
</template>
