<template>
        <UToggle  on-icon="i-heroicons-moon-20-solid" off-icon="i-heroicons-sun-20-solid" v-model="isDark"/>

</template>
<script setup lang="ts">

import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>