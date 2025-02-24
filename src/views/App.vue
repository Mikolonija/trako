<template>
    <div class="app-layout">
        <Header />
        <Teleport to='#sidebar'>
            <SideBar />
        </Teleport>
        <main class="app-main">
            <div class="loader-overlay" v-if="isLoading">
                <div class="loader" />
            </div>
            <template v-else>
                <router-view />
            </template>
        </main>
    </div>
    <notifications class="notification" />
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import { onMounted, ref } from 'vue';
import SideBar from "@/components/menu/Sidebar.vue";
import Header from "@/components/Header.vue";
import { useRouter } from "vue-router";

const themeStore = useThemeStore();
const isLoading = ref<boolean>(true);
const router = useRouter();

router.beforeEach((_, __, next) => {
    isLoading.value = true;
    next();
});

router.afterEach(() => {
    isLoading.value = false;
});

onMounted(() => {
    themeStore.applyTheme();
});
</script>

<style setup lang="scss">
@use "@/styles/notification" as *;

.app-layout {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr;
    margin-left: 60px;

    @include media-query(phone) {
        grid-template-rows: 80px 1fr;
        grid-template-columns: 1fr;
        margin-left: 0;
    }
}

.app-main {
    overflow: hidden;
}

.app-layout {
    position: relative;
}
</style>
