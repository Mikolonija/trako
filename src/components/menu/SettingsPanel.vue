<template>
  <div class="settings-container" :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }">
    <div class="layout-center" v-if="!sideBarStore.isMenuSideBarCollapsed">
      <SvgImage
        :iconSrc="settingsImg"
        :alt="t('imagesAlt.settingsImg')"
        :useComponent="false"
        width="24"
        height="24"
      />
    </div>
    <template v-else>
      <h2 class="font-montserrat-18-bold">{{ t('menu.settings.main') }}</h2>
    </template>
    <ul class="settings-menu" :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }">
      <li v-for="setting in settings" :key="setting.key" @click="sideBarStore.closeMenuSideBar()">
        <div
          class="layout-left-center settings-menu-header"
          :class="{ collapsed: !sideBarStore.isMenuSideBarCollapsed }"
        >
          <p class="font-montserrat-16-regular settings-menu-header-title">
            {{ setting.title }}
          </p>
          <p class="font-montserrat-16-bold settings-menu-header-text-active">
            {{ setting.activeValue() }}
          </p>
        </div>
        <div class="setting-menu-lists">
          <template v-for="option in setting.options" :key="option.value">
            <p
              tabindex="0"
              :title="option.title"
              @keydown.enter="setting.change(option.value)"
              :class="
                option.value === setting.active()
                  ? 'font-montserrat-16-regular setting-menu-lists-text-active'
                  : 'setting-menu-lists-text font-montserrat-16-regular'
              "
              @click="setting.change(option.value)"
            >
              {{ option.text }}
            </p>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ThemeType } from '@/types/enums/theme';
import { LanguageType } from '@/types/enums/language';
import { useThemeStore } from '@/stores/theme';
import { useLanguageStore } from '@/stores/language';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useSideBarStore } from '@/stores/sideBar';
import settingsImg from '@/assets/menu/setting.svg?url';
import SvgImage from '@/components/SvgImage.vue';
import type { Setting } from '@/types/interfaces/menu';

const { locale, t } = useI18n();
const themeStore = useThemeStore();
const languageStore = useLanguageStore();
const sideBarStore = useSideBarStore();

const settings = computed<Setting[]>(() => [
  {
    key: 'theme',
    title: !sideBarStore.isMenuSideBarCollapsed ? '' : t('menu.settings.theme'),
    active: () => themeStore.theme,
    activeValue: () => (themeStore.theme === ThemeType.DM ? ThemeType.DM : ThemeType.LM),
    change: (value: string) => themeStore.changeTheme(value as ThemeType),
    options: [
      {
        value: ThemeType.DM,
        title: t('menu.settings.darkMode'),
        text: !sideBarStore.isMenuSideBarCollapsed ? ThemeType.DM : t('menu.settings.darkMode'),
      },
      {
        value: ThemeType.LM,
        title: t('menu.settings.lightMode'),
        text: !sideBarStore.isMenuSideBarCollapsed ? ThemeType.LM : t('menu.settings.lightMode'),
      },
    ],
  },
  {
    key: 'language',
    title: !sideBarStore.isMenuSideBarCollapsed ? '' : t('menu.settings.language'),
    active: () => languageStore.language,
    activeValue: () =>
      languageStore.language === LanguageType.EN ? LanguageType.EN : LanguageType.LT,
    change: (value: string) => {
      languageStore.changeLanguage(value as LanguageType);
      locale.value = value;
    },
    options: [
      {
        value: LanguageType.EN,
        title: t('menu.settings.languages.en'),
        text: !sideBarStore.isMenuSideBarCollapsed
          ? LanguageType.EN
          : t('menu.settings.languages.en'),
      },
      {
        value: LanguageType.LT,
        title: t('menu.settings.languages.lt'),
        text: !sideBarStore.isMenuSideBarCollapsed
          ? LanguageType.LT
          : t('menu.settings.languages.lt'),
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.settings-container {
  margin: $spacing-xx-large 0 0 0;
  padding: $spacing-xx-large $spacing-large;
  border-top: 1px solid var(--sideBar-line);
  white-space: nowrap;
  color: var(--sideBar-color);
}

.settings-container.collapsed {
  padding: $spacing-xx-large 0;
}

.settings-menu {
  display: grid;
  gap: $spacing-xx-large;
  padding: $spacing-large 0;

  @include media-query(phone) {
    padding: $spacing-large 0 0 0;
  }
}

.settings-menu.collapsed {
  text-align: center;
}

.settings-menu-header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: $spacing-small;

  &-title {
    color: var(--sideBar-color);
  }

  &-text-active {
    color: var(--sideBar-active);
  }
}

.settings-menu-header.collapsed {
  grid-template-columns: 1fr;
}

.setting-menu-lists {
  gap: $spacing-medium;
  display: grid;
  padding: $spacing-large 0 0 0;

  &-text {
    color: var(--sideBar-not-active);
    cursor: pointer;
    width: 100%;
  }

  &-text:hover {
    opacity: 0.8;
  }

  &-text-active {
    color: var(--sideBar-active);
  }
}
</style>
