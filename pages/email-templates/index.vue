<template>
  <div>
    <h2 class="font-semibold text-3xl mb-4">Browse Templates</h2>

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(template, index) in templates"
        :key="index"
        class="col-span-4 md:col-span-2 lg:col-span-2"
      >
        <UCard>
          <template #header>
            <h3 class="font-semibold text-xl mb-2">{{ template.name }}</h3>
          </template>
          <p>{{ template.description }}</p>
          <template #footer>
            <div class="flex justify-end space-x-4">
              <UButton color="primary" @click="router.push(template.route)"
                >Go to template</UButton
              >
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

interface Template {
  id: number;
  name: string;
  description: string;
  route: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Send Offer Letter",
    description: `
Use this template to send a new Offer Letter. 
      `,
    route: "/email-templates/offer-email",
  },
  {
    id: 2,
    name: "Request nursing spot",
    description: `
Use this template to request a new nursing spot to Saifon. 
      `,
    route: "/email-templates/nursing-spot",
  },

  {
    id: 3,
    name: "Credit Transfer",
    description: `
All credit Transfer templates      `,
    route: "/email-templates/credit-transfer",
  },
];
</script>
