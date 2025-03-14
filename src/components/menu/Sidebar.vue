<template>
  <div :class="{ outside: sideBarStore.isMenuSideBarCollapsed }">
    <aside
      class="aside"
      @keyup.esc="sideBarStore.closeMenuSideBar()"
      tabindex="-1"
      :class="{
        collapsed: !sideBarStore.isMenuSideBarCollapsed,
        openSideBar: sideBarStore.isMenuSideBarOpen,
      }"
      ref="sidebar"
    >
      <nav class="nav">
        <router-link
          to="/"
          class="nav-header"
          :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }"
          @click="sideBarStore.closeMenuSideBar()"
        >
          <SvgImage
            :alt="t('imagesAlt.emblemImg')"
            :iconSrc="emblemImg"
            :useComponent="false"
            width="36"
            height="36"
          />
          <h1 class="font-montserrat-36-bold" v-if="sideBarStore.isMenuSideBarCollapsed">Trako</h1>
        </router-link>
        <div class="menu">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :title="t(item.text)"
            :class="{
              collapsed: !sideBarStore.isMenuSideBarCollapsed,
              'active-link': item.activeLink.includes(String(route.name)),
            }"
            class="layout-left-center menu-container"
            active-class="active-link"
            @click="resetPage()"
          >
            <SvgImage
              :alt="t(item.alt)"
              :iconSrc="
                item.activeLink.includes(String(route.name)) ? item.activeImg : item.noActiveImg
              "
              :useComponent="false"
              width="24"
              height="24"
            />
            <span
              v-if="sideBarStore.isMenuSideBarCollapsed"
              class="menu-text font-montserrat-16-regular"
            >
              {{ t(item.text) }}
            </span>
          </router-link>
        </div>
        <SettingsPanel />
      </nav>
      <div class="nav-footer" :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }">
        <div
          class="nav-footer-position"
          :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }"
        >
          <button
            type="button"
            data-testid="cy-resize-menu-btn"
            :aria-label="t('buttonsLabels.toggleSidebar')"
            class="nav-footer-collapse-btn"
            @click="sideBarStore.resizeMenuSideBar()"
          >
            <SvgImage
              :alt="t('imagesAlt.arrowImg')"
              :iconSrc="arrowImg"
              :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }"
              name="item.text"
              :useComponent="false"
              width="24"
              height="24"
              class="nav-footer-collapse-row-icon"
            />
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useSideBarStore } from '@/stores/sideBar';
import SettingsPanel from '@/components/menu/SettingsPanel.vue';
import type { NavigationList } from '@/types/interfaces/menu';
import { onClickOutside } from '@vueuse/core';
import { routerPath } from '@/config';
import helpImg from '@/assets/menu/help.svg?url';
import homeImg from '@/assets/menu/home.svg?url';
import helpActiveImg from '@/assets/menu/helpActive.svg?url';
import homeActiveImg from '@/assets/menu/homeActive.svg?url';
import arrowImg from '@/assets/globals/arrow.svg?url';
import emblemImg from '@/assets/globals/emblem.svg?url';
import SvgImage from '@/components/SvgImage.vue';
import { useHabitStore } from '@/stores/habit';

const { t } = useI18n();
const route = useRoute();
const sideBarStore = useSideBarStore();
const sidebar = ref(null);
const habitStore = useHabitStore();

const menuItems: NavigationList[] = [
  {
    path: routerPath.home.path,
    text: 'menu.home',
    alt: 'imagesAlt.homeImg',
    activeImg: homeActiveImg,
    noActiveImg: homeImg,
    activeLink: [routerPath.home.name, routerPath.homeByDate.name, routerPath.homeByDateRange.name],
  },
  {
    path: routerPath.help.path,
    text: 'menu.help',
    alt: 'imagesAlt.helpImg',
    activeImg: helpActiveImg,
    noActiveImg: helpImg,
    activeLink: [routerPath.help.name],
  },
];

const resetPage = (): void => {
  sideBarStore.closeMenuSideBar();
  if (
    [routerPath.home.name, routerPath.homeByDate.name, routerPath.homeByDateRange.name].includes(
      String(route.name),
    )
  ) {
    habitStore.resetHabitState();
    sideBarStore.closeHabitNavigationSideBar();
  }
};

onClickOutside(sidebar, (): void => {
  sideBarStore.closeMenuSideBar();
});
</script>

<style scoped lang="scss">
.outside {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--teleport-bg-outside);
  z-index: $z-index-default;

  @include media-query(phone) {
    position: static;
    background-color: transparent;
  }
}

.aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: none;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--sideBar-bg);
  transition:
    width 0.3s ease,
    left 0.3s ease;
  width: 240px;
  top: 0;
  left: 0;
  bottom: 0;
  flex: 1;
  z-index: $z-index-default;

  @include media-query(phone) {
    left: -100%;
    top: 79px;
  }
}

.aside.collapsed {
  width: 60px;

  @include media-query(phone) {
    width: 0;
    left: -100%;
  }
}

.aside.openSideBar {
  @include media-query(phone) {
    width: 100% !important;
    left: 0 !important;
  }
}

.nav {
  &-header {
    margin: $spacing-xx-large $spacing-large;
    gap: $spacing-small;
    display: grid;
    grid-template-columns: auto 1fr;
    color: var(--sideBar-color);

    @include media-query(phone) {
      display: none;
    }
  }

  &-header.collapsed {
    @include layout-position(center, center);
    margin: $spacing-xx-large auto;
  }
}

.menu {
  gap: $spacing-medium;
  display: grid;

  @include media-query(phone) {
    border-top: 1px solid var(--sideBar-line);
    padding: $spacing-xx-large 0 0 0;
  }

  &-container {
    gap: $spacing-small;
    padding: 0 $spacing-large;
  }

  &-container:hover {
    opacity: 0.8;
  }

  &-container.collapsed {
    @include layout-position(center, center);
    padding: 0;
  }

  &-text {
    color: var(--sideBar-not-active);
  }
}

.active-link {
  position: relative;
  opacity: 1;
  cursor: default;

  .menu-text {
    color: var(--sideBar-active);
    font-weight: 600;
  }
}

.active-link > .menu-text {
  color: var(--sideBar-active);
  font-weight: 600;
}

.active-link::after {
  border: 1px solid var(--sideBar-active);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  content: '';
}

.nav-footer {
  height: 60px;

  &-collapse-btn {
    background-color: transparent;
  }

  &-position {
    height: 100%;
    margin: 0 24px 0 0;
    @include layout-position(right, center);
  }

  &-position.collapsed {
    height: 100%;
    margin: 0;
    @include layout-position(center, center);
  }

  &-collapse-row-icon {
    cursor: pointer;
    transform: rotate(-90deg);

    @include media-query(phone) {
      display: none;
    }
  }

  &-collapse-row-icon:hover {
    opacity: 0.8;
  }

  &-collapse-row-icon.collapsed {
    transform: rotate(90deg);
    margin-right: 0;
  }
}
</style>
