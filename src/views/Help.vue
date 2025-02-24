<template>
    <div class="help-page-layout">
        <div class="bubble-container">
            <AnimationBubbles />
        </div>
        <div class="help-card">
            <div class="help-container">
                <section class="help-container-header">
                    <h2 class="font-montserrat-28-bold">
                        {{ t("help.welcomeTitle") }}
                    </h2>
                    <p class="font-montserrat-16-regular help-container-header-description">
                        {{ t("help.welcomeDescription") }}
                    </p>
                </section>
                <div class="help-feature-container">
                    <div v-for="(item) in items" :key="item.id" class="help-feature-item">
                        <h3 class="help-feature-title font-montserrat-16-bold">
                            <span class="help-feature-symbol">{{ item.symbol }}</span>
                            {{ t(item.title) }}
                        </h3>
                        <p v-if="item.id === 10" class="help-feature-description font-montserrat-16-regular">
                            {{ t(item.description, { defaultYearsDuration }) }}</p>
                        <p v-else class="help-feature-description font-montserrat-16-regular">
                            {{ t(item.description) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AnimationBubbles from '@/components/AnimationBubbles.vue'
import { defaultYearsDuration } from '@/config';
import type { FeatureItem } from '@/types/interfaces/feature';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const items = [
    {
        id: 1,
        title: "features.userFriendly.title",
        description: "features.userFriendly.description",
        symbol: "😊"
    },
    {
        id: 2,
        title: "features.habitManagement.title",
        description: "features.habitManagement.description",
        symbol: "🛠️"
    },
    {
        id: 3,
        title: "features.flexibleNavigation.title",
        description: "features.flexibleNavigation.description",
        symbol: "📅"
    },
    {
        id: 4,
        title: "features.repeatingHabits.title",
        description: "features.repeatingHabits.description",
        symbol: "🔁"
    },
    {
        id: 5,
        title: "features.habitStatusTracking.title",
        description: "features.habitStatusTracking.description",
        symbol: "📊"
    },
    {
        id: 6,
        title: "features.progressOverview.title",
        description: "features.progressOverview.description",
        symbol: "✅"
    },
    {
        id: 7,
        title: "features.calendarNavigation.title",
        description: "features.calendarNavigation.description",
        symbol: "📅🔴"
    },
    {
        id: 8,
        title: "features.multilingualSupport.title",
        description: "features.multilingualSupport.description",
        symbol: "🌍"
    },
    {
        id: 9,
        title: "features.themeCustomization.title",
        description: "features.themeCustomization.description",
        symbol: "🌙🌞"
    },
    {
        id: 10,
        title: "features.dateRangeSelection.title",
        description: "features.dateRangeSelection.description",
        symbol: "📅📆"
    },
    {
        id: 11,
        title: "features.routerNavigation.title",
        description: "features.routerNavigation.description",
        symbol: "🔗"
    }
] as FeatureItem[];

</script>

<style scoped lang="scss">
.help-page-layout {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}

.bubble-container {
    @include media-query(tablet) {
        display: none;
    }
}

.help-card {
    height: 100%;
    width: 100%;
    overflow: auto;
    border-right: solid 1px var(--line);
    border-left: solid 1px var(--line);
    background-color: var(--bg-color);
    position: relative;
    max-width: $breakpoint-tablet;
    margin: 0 auto;

    @include media-query(tablet) {
        border: none;
    }
}

.help-container {
    padding: $spacing-xx-large $spacing-large;

    @include media-query(tablet) {
        padding: $spacing-large $spacing-medium;
    }
}

.help-container-header {
    text-align: center;
    position: relative;
    padding: 0 0 $spacing-xx-large 0;

    @include media-query(tablet) {
        padding: 0 0 $spacing-large 0;
    }

    &-description {
        line-height: 1.2;
        padding: $spacing-small 0 0 0;
    }
}

.help-feature {
    &-container {
        display: grid;
        gap: $spacing-medium;
        grid-template-columns: 1fr;
    }

    &-item {
        position: relative;
        background: var(--card-bg);
        box-shadow: var(--card-shadow-color) 0px 1px 4px;
        border-radius: $radius-small;
        padding: $spacing-medium;
    }

    &-description {
        line-height: 1.2;
        padding: $spacing-small 0 0 0;
    }
}
</style>
