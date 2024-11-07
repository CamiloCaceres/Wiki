<template>
  <div v-if="isPending">
    Loading...
  </div>
  <div v-else-if="isError">
    Error: {{ error }}
  </div>
  <div class="flex flex-col gap-4 max-h-[500px] overflow-y-auto" v-else>
    <h1 class="text-2xl font-bold">Notifications</h1>
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 " v-for="notification in notifications" :key="notification.id">
        <div class="flex justify-between items-center border-l-4 border-primary pl-4">

            <h1>{{ notification.title }}</h1>
            <Notification :title="notification.title" :message="notification.message" />
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import type { Notification } from '@/types/notifications';

const { getAllNotifications } = usePocketbase();

const { isPending, isError, data: notifications, error } = useQuery({
  queryKey: ['getAllNotifications'],
  queryFn: getAllNotifications,
});
</script>

