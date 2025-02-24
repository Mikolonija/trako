<template>
    <aside class="filter-sideBar" :class="{ 'collapsed': sideBarStore.isHabitNavigationSideBarCollapsed }">
        <div class="filter-sideBar-header">
            <h2 class="font-montserrat-28-bold">{{ t('habitFilter.navigate') }}</h2>
            <button type="button" :aria-label="t('buttonsLabels.toggleHabitNavigationSidebar')" class="collapse-btn"
                @click="sideBarStore.resizeHabitNavigationSideBar()">
                <SvgImage :alt="t('imagesAlt.arrowImg')" name="arrow" folder="globals" class="collapse-btn-row-icon"
                    :class="{ 'collapsed': sideBarStore.isHabitNavigationSideBarCollapsed }" />
            </button>
        </div>
        <div class="filter-sideBar-main" :class="{ 'collapsed': sideBarStore.isHabitNavigationSideBarCollapsed }">
            <VueDatePicker prevent-min-max-navigation
                :year-range="[minHabitDate.getFullYear(), maxHabitDate.getFullYear()]" :min-date="minHabitDate"
                class="days-calendar" :locale="locale.toLowerCase()" :range="{ showLastInRange: false }"
                :max-date="maxHabitDate" :dark="themeStore.getThemeStatus" v-model="filterDateRange" inline auto-apply
                :enable-time-picker="false" :markers="habitStore.markDays" />
            <button type="button" :aria-label="t('buttonsLabels.filterHabits')"
                :disabled="isSameDateRange(filterDateRange, habitStore.dateRange)"
                class="confirm-btn filter-btn-position font-montserrat-14-bold" @click="filterHabit()">
                {{ t('habitFilter.filter') }}
            </button>
            <button type="button" :aria-label="t('buttonsLabels.resetHabitFilter')"
                :disabled="isSameDateRange(filterDateRange, defaultHabitRange)"
                class="cancel-btn reset-btn-position font-montserrat-14-bold" @click="clearHabitFilter()">
                {{ t('habitFilter.reset') }}
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { useI18n } from 'vue-i18n';
import { useHabitStore } from '@/stores/habit';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { notify } from '@kyvg/vue3-notification';
import { defaultHabitRange } from '@/config';
import type { RouteParamsGeneric } from 'vue-router';
import SvgImage from '@/components/SvgImage.vue';
import { defaultYearsDuration } from '@/config';
import { useSideBarStore } from '@/stores/sideBar';
import { formatDate } from '@/utils/helpers';

const { locale, t } = useI18n();
const themeStore = useThemeStore();
const habitStore = useHabitStore();
const sideBarStore = useSideBarStore();
const filterDateRange = ref<Date[]>(defaultHabitRange);
const maxHabitDate = new Date(new Date().setFullYear(new Date().getFullYear() + defaultYearsDuration));
const minHabitDate = new Date(new Date().getFullYear(), 0, 1);

const isSameDateRange = (dateRange1: Date[], dateRange2: Date[]): boolean => {
    if (!dateRange1 || !dateRange2 || dateRange1.length !== dateRange2.length) return false;
    return dateRange1.every((date, index) => date.getTime() === dateRange2[index].getTime());
};

const isValidDateRange = (date: Date): boolean => {
    if (date < minHabitDate || date > maxHabitDate) {
        notify({
            title: t('notification.invalidDateRangeError.title'),
            text: t('notification.invalidDateRangeError.description', { minDate: formatDate(minHabitDate), maxDate: formatDate(maxHabitDate) }),
            type: 'error',
        });
        return false;
    }
    return true;
};

const validateDateRange = (startDate: Date, endDate: Date): Date[] => {
    const isStartDateValid: boolean = isValidDateRange(startDate);
    const isEndDateValid: boolean = isValidDateRange(endDate);
    if (startDate > endDate) {
        notify({
            title: t('notification.rangeError.title'),
            text: t('notification.rangeError.description'),
            type: 'error',
        });
        return defaultHabitRange;
    }
    if (!isStartDateValid || !isEndDateValid) return defaultHabitRange;
    return [startDate, endDate];
};

const validateCurrentRange = (currentDate: Date): Date[] => {
    const isStartDateValid: boolean = isValidDateRange(currentDate);
    if (!isStartDateValid) return defaultHabitRange;
    return [currentDate, currentDate];
};

const isValidDate = (dateString: string): boolean => {
    if (!dateString || typeof dateString !== 'string') return false;
    let regEx: RegExp = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    let d: Date = new Date(dateString);
    let dNum: number = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
};

const inValiDate = (): Date[] => {
    notify({
        title: t('notification.invalidDateError.title'),
        text: t('notification.invalidDateError.description'),
        type: 'error',
    });
    return defaultHabitRange;
};

const handleMultipleDate = (params: RouteParamsGeneric): Date[] | null => {
    if (params.startDate && params.endDate) {
        if (isValidDate(params.startDate as string) === true && isValidDate(params.endDate as string) === true) {
            const startDate: Date = new Date(params.startDate as string);
            const endDate: Date = new Date(params.endDate as string);
            return validateDateRange(startDate, endDate);
        }

        else return inValiDate();
    }
    return null;
};

const handleSingleDate = (params: RouteParamsGeneric): Date[] | null => {
    if (params.date) {
        if (isValidDate(params.date as string) === true) {
            const currentDate: Date = new Date(params.date as string);
            return validateCurrentRange(currentDate);

        }
        else return inValiDate();
    }
    return null
};

const filterHabit = (): void => {
    sideBarStore.closeHabitNavigationSideBar();
    const [startDate, endDate]: Date[] = filterDateRange.value;
    router.replace(`/day/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}`);
}

const clearHabitFilter = (): void => {
    sideBarStore.closeHabitNavigationSideBar();
    router.replace(`/`);
}

const updateHabitFilterFromRouter = (): void => {
    const { params } = router.currentRoute.value;
    const dateFilterRange: Date[] | null = handleMultipleDate(params);
    if (dateFilterRange) {
        return updateHabitDateFilter(dateFilterRange)
    }
    const singleDateFilterRange: Date[] | null = handleSingleDate(params);
    if (singleDateFilterRange) {
        return updateHabitDateFilter(singleDateFilterRange)
    }
    else return updateHabitDateFilter(filterDateRange.value)
};

const updateHabitDateFilter = (dateRange: Date[]): void => {
    habitStore.setHabitDateFilter(dateRange);
    filterDateRange.value = dateRange;
}

onMounted(() => {
    updateHabitFilterFromRouter();
});

</script>

<style scoped lang="scss">
.filter-sideBar {
    border-left: solid 1px var(--line);
    padding: $spacing-large;
    max-width: 360px;
    background-color: var(--bg-color);
    height: 100%;

    @include media-query(tablet) {
        border-left: none;
        padding: $spacing-large $spacing-medium;
        max-width: 100%;
        border-top: solid 1px var(--line);
        box-shadow: var(--sidebar-shadow-color) 0px 1px 4px;
        position: absolute;
        right: 0;
        left: 0;
        z-index: $z-index-default;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }

    @include media-query(phone) {
        left: 0;
    }

    &.collapsed {
        overflow-y: auto;
        position: fixed;
        bottom: 0;

        @include media-query(tablet) {
            left: 60px;
        }

        @include media-query(phone) {
            left: 0;
        }
    }

    &-header {
        display: grid;
        grid-template-columns: 1fr auto;
        padding-bottom: $spacing-large;
    }

    &-main {
        display: block;
    }

    @include media-query(tablet) {
        &-main {
            display: none;
        }
    }

    &-main.collapsed {
        @include media-query(tablet) {
            display: block;
        }
    }
}

.collapse-btn {
    display: none;
    background: transparent;

    @include media-query(tablet) {
        display: block;
    }

    &-row-icon {
        fill: var(--color);
        transform: rotate(0deg);
    }

    &-row-icon:hover {
        opacity: 0.8;
    }

    &-row-icon.collapsed {
        transform: rotate(180deg);
        margin-right: 0;
    }
}

.filter-btn-position {
    margin-top: $spacing-medium;
    width: 100%;

    @include media-query(tablet) {
        margin-top: $spacing-large;
    }
}

.reset-btn-position {
    margin-top: $spacing-small;
    width: 100%;
}
</style>
