<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Common Keyboard Shortcuts</h1>
      
      <div v-for="(category, index) in shortcutCategories" :key="index" class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">{{ category.name }}</h2>
        <ul class="space-y-2">
          <li v-for="(shortcut, shortcutIndex) in category.shortcuts" :key="shortcutIndex" class="flex items-center">
            <div class="flex items-center space-x-1 mr-2">
              <UKbd size="md" v-for="key in shortcut.keys" :key="key" :value="renderKey(key)" />
            </div>
            <span class="text-gray-700">: {{ shortcut.description }}</span>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { UKbd } from '#components'
  
  const { metaSymbol } = useShortcuts()
  
  const shortcutCategories = [
    {
      name: 'Text Editing',
      shortcuts: [
        { keys: ['meta', 'C'], description: 'Copy' },
        { keys: ['meta', 'X'], description: 'Cut' },
        { keys: ['meta', 'V'], description: 'Paste' },
        { keys: ['meta', 'Shift', 'V'], description: 'Paste without formatting' },
        { keys: ['meta', 'Z'], description: 'Undo' },
        { keys: ['meta', 'Shift', 'Z'], description: 'Redo' },
        { keys: ['meta', 'A'], description: 'Select all' },
      ]
    },
    {
      name: 'Cursor Movement',
      shortcuts: [
        { keys: ['meta', '←'], description: 'Move cursor one word left' },
        { keys: ['meta', '→'], description: 'Move cursor one word right' },
        { keys: ['meta', '↑'], description: 'Move cursor one paragraph up' },
        { keys: ['meta', '↓'], description: 'Move cursor one paragraph down' },
        { keys: ['Home'], description: 'Move to beginning of line' },
        { keys: ['End'], description: 'Move to end of line' },
        { keys: ['meta', 'Home'], description: 'Move to beginning of document' },
        { keys: ['meta', 'End'], description: 'Move to end of document' },
      ]
    },
    {
      name: 'Text Selection',
      shortcuts: [
        { keys: ['Shift', '←/→/↑/↓'], description: 'Select text' },
        { keys: ['meta', 'Shift', '←/→/↑/↓'], description: 'Select whole words/paragraphs' },
      ]
    },
    {
      name: 'Window Management',
      shortcuts: [
        { keys: ['Alt', 'Tab'], description: 'Switch between open windows' },
        { keys: ['⊞', 'D'], description: 'Show/hide desktop' },
        { keys: ['⊞', '←/→'], description: 'Snap window to left/right side' },
      ]
    },
    {
      name: 'Browser',
      shortcuts: [
        { keys: ['meta', 'T'], description: 'New tab' },
        { keys: ['meta', 'W'], description: 'Close current tab' },
        { keys: ['meta', 'Shift', 'T'], description: 'Reopen last closed tab' },
        { keys: ['meta', 'L'], description: 'Focus on address bar' },
      ]
    },
  ]
  
  const renderKey = (key: string): string => {
    if (key === 'meta') {
      return metaSymbol.value
    }
    return key
  }
  </script>