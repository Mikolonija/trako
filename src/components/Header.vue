<template>
  <header class="header-container">
    <div class="layout-left-center">
      <template v-if="!sideBarStore.isMenuSideBarOpen">
        <SvgImage
          :iconSrc="barImg"
          :alt="t('imagesAlt.barImg')"
          :useComponent="false"
          width="36"
          height="36"
          @click="sideBarStore.openMenuSideBar()"
        />
      </template>
      <template v-else>
        <SvgImage
          :alt="t('imagesAlt.closeImg')"
          name="close"
          folder="globals"
          width="36"
          height="36"
          class="default-icon-color"
          @click="sideBarStore.closeMenuSideBar()"
        />
      </template>
    </div>
    <div class="layout-right-center">
      <router-link @click="sideBarStore.closeMenuSideBar()" to="/" class="app-logo">
        <SvgImage
          :alt="t('imagesAlt.emblemImg')"
          :iconSrc="emblemImg"
          :useComponent="false"
          width="36"
          height="36"
        />
        <h1 class="font-montserrat-36-bold">Trako</h1>
      </router-link>
    </div>
  </header>
</template>
<script setup lang="ts">
import SvgImage from '@/components/SvgImage.vue';
import { useSideBarStore } from '@/stores/sideBar';
import emblemImg from '@/assets/globals/emblem.svg?url';
import barImg from '@/assets/header/bar.svg?url';
import { useI18n } from 'vue-i18n';

const sideBarStore = useSideBarStore();
const { t } = useI18n();
</script>
<style scoped lang="scss">
.header-container {
  display: none;
  background-color: var(--header-bg);
  height: 100%;
  padding: 0 $spacing-medium;
  z-index: $z-index-default;
  backdrop-filter: blur(8px);
  box-shadow:
    var(--header-shadow-color) 0px 14px 28px,
    var(--header-shadow-color) 0px 10px 10px;

  @include media-query(phone) {
    display: block;
    display: grid;
    grid-template-columns: 1fr auto;
  }
}

.app-logo {
  gap: $spacing-small;
  display: grid;
  grid-template-columns: 1fr auto;
  color: var(--header-color);
}

.default-icon-color {
  fill: var(--header-icon);
}
</style>
