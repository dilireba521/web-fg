<template>
    <div>
        <LayoutHeader></LayoutHeader>
        <PageLayout></PageLayout>
        <LayoutFooter />
    </div>
</template>
<script lang="ts" setup>
import PageLayout from "@/layouts/page/index.vue";
import LayoutFooter from "@/layouts/default/footer/index.vue"
import LayoutHeader from "@/layouts/default/header/index.vue"

</script>