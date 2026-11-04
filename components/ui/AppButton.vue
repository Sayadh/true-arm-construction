<script setup lang="ts">
import type { AnalyticsEvent } from '~/composables/useAnalytics'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'dark' | 'outline' | 'outline-light' | 'quiet'
    size?: 'md' | 'lg'
    block?: boolean
    disabled?: boolean
    loading?: boolean
    track?: AnalyticsEvent
    trackLabel?: string
  }>(),
  { type: 'button', variant: 'primary', size: 'md' }
)

const emit = defineEmits<{ click: [MouseEvent] }>()
const { track } = useAnalytics()

const base =
  'inline-flex items-center justify-center gap-2 rounded font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,box-shadow] duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60 select-none'

const variants: Record<string, string> = {
  primary: 'bg-bronze text-white hover:bg-bronze-dark active:bg-bronze-dark',
  dark: 'bg-ink text-paper hover:bg-deep',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]',
  'outline-light': 'border border-paper/30 text-paper hover:border-paper hover:bg-paper/5',
  quiet: 'text-ink underline decoration-bronze decoration-2 underline-offset-[6px] hover:decoration-ink px-0'
}

const sizes: Record<string, string> = {
  md: 'min-h-[44px] px-5 text-[0.9375rem]',
  lg: 'min-h-[52px] px-7 text-base'
}

const classes = computed(() => [
  base,
  variants[props.variant],
  props.variant === 'quiet' ? 'min-h-[44px]' : sizes[props.size],
  props.block ? 'w-full' : ''
])

const isExternal = computed(() => Boolean(props.href && /^https?:\/\//.test(props.href)))

function onClick(e: MouseEvent) {
  if (props.track) track(props.track, props.trackLabel ? { label: props.trackLabel } : {})
  emit('click', e)
}
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes" @click="onClick">
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener' : undefined"
    @click="onClick"
  >
    <slot />
  </a>
  <button v-else :type="type" :class="classes" :disabled="disabled || loading" :aria-busy="loading || undefined" @click="onClick">
    <slot />
  </button>
</template>
