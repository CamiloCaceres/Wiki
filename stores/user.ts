import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const username = useLocalStorage('username', '');

  function setUsername(newUsername: string): void {
    username.value = newUsername;
  }

  return {
    username,
    setUsername,
  };
});