<script setup lang="ts">
/**
 * Explicit icon map keeps the bundle small (only icons listed here are shipped)
 * while letting data files reference icons by name.
 */
import {
  Hammer, Bath, Grid3x3, PaintRoller, Paintbrush, Fence, Droplets,
  Building2, House, ShieldCheck, FileBadge, MapPin, ClipboardList, MessagesSquare,
  Ruler, CalendarClock, HardHat, Compass, FileText, Camera, Search,
  CookingPot, HousePlus, Layers, PaintBucket, PanelTop, TreeDeciduous, Wrench, Tent
} from 'lucide-vue-next'
import type { Component } from 'vue'

const icons: Record<string, Component> = {
  Hammer, Bath, Grid3x3, PaintRoller, Paintbrush, Fence, Droplets,
  Building2, House, ShieldCheck, FileBadge, MapPin, ClipboardList, MessagesSquare,
  Ruler, CalendarClock, HardHat, Compass, FileText, Camera, Search,
  CookingPot, HousePlus, Layers, PaintBucket, PanelTop, TreeDeciduous, Wrench, Tent
}

const props = withDefaults(defineProps<{ name: string; size?: number; strokeWidth?: number }>(), {
  size: 24,
  strokeWidth: 1.5
})

const icon = computed(() => icons[props.name] ?? Hammer)
</script>

<template>
  <component :is="icon" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
</template>
