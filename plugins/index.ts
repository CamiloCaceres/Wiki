import { VueQueryPlugin } from '@tanstack/vue-query'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


export default defineNuxtPlugin((app) => {
    app.vueApp.use(VueQueryPlugin)
    app.vueApp.use(autoAnimatePlugin)
})
