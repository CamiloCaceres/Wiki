import { ref, onMounted } from 'vue'

export function useUsername() {
  const userName = ref('')

  onMounted(() => {
    const storedUserName = localStorage.getItem('localUserName')
    if (storedUserName) {
      userName.value = storedUserName
    }
  })

  const setUserName = (newUserName: string) => {
    userName.value = newUserName
    localStorage.setItem('localUserName', newUserName)
  }

  return {
    userName,
    setUserName,
  };
}
