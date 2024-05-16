<template>
    <h2 class="font-bold text-xl mb-4">Useful links: </h2>
    <div v-for="link in links">
        <Link v-bind="link" />

    </div>
    <LinkCard />
</template>

<script setup lang="ts">

const links = reactive([
  {
    id: 1,
    name: "IELTS Verification",
    link: "https://ielts.ucles.org.uk/ielts-trf/welcome.html",
  },
  {
    id: 2,
    name: "PTE Verification",
    link: "https://srw-prd-front.srw.pteacademic.com/login",
  },
  {
    id: 3,
    name: "Year 12 equivalencies",
    link: "https://www.vcaa.vic.edu.au/assessment/results/credit-recognition/credit-vce/equivalent-quals/Pages/Assess-overseas-qual-12.aspx#link77",
  },
  {
    id: 4,
    name: "University equivalencies",
    link: "https://shop.internationaleducation.gov.au/Security/Login.aspx?ReturnUrl=https%3A%2F%2Finternationaleducation.gov.au%2Fcep",
  },
  {
    id: 5,
    name: "Scholarships",
    link: "International Scholarships MASTER TEAM.xlsx",
  },
  {
    id: 6,
    name: "AHPRA Verification",
    link: "https://www.ahpra.gov.au/",
  },
  {
    id: 7,
    name: "LLN Test",
    link: "https://oars.acer.edu.au/torrens-university-australia-limited",
  },
]);
</script>