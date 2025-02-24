<template>
    <div class="habit-card-item">
        <div class="habit-card-actions">
            <div class="layout-center">
                <button type="button" :aria-label="t('buttonsLabels.viewHabitDetails')"
                    class="cancel-btn btn-size font-montserrat-14-bold" @click="openMyHabitModal()"
                    @keyup.esc="modalStore.hideModal()">
                    {{ `${habitCompletionStats.completed}/${habitCompletionStats.total}` }}
                </button>
            </div>
            <div class="habit-card-actions-items">
                <slot name="actions"></slot>
            </div>
        </div>
        <div class="habit-card-item-title" :class="{ 'complete': isComplete }">
            <p class="font-montserrat-14-regular">
                {{ props.habit.name }}
            </p>
        </div>
        <div class="habit-card-item-info">
            <p class="font-montserrat-12-bold status" :class="habitStatusClass">
                {{ habitStatusMsg }}
            </p>
            <div class="habit-card-item-deadline">
                <div class="habit-card-item-deadline-item layout-right-center">
                    <SvgImage :alt="t('imagesAlt.calendarImg')" name="calendar" folder="habitCard" width="16"
                        height="16" class="default-icon-color" />
                    <span class="font-montserrat-12-regular">{{ formattedDeadlineDate }}</span>
                </div>
                <div class="habit-card-item-deadline-item layout-right-center">
                    <SvgImage :alt="t('imagesAlt.clockImg')" name="clock" folder="habitCard" width="16" height="16"
                        class="default-icon-color" />
                    <span class="font-montserrat-12-regular">{{ formattedTime }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HabitStatus } from '@/types/enums/habit';
import { formatTime, getStatus, formatDate } from '@/utils/helpers';
import type { Habit, HabitStatusInfo } from '@/types/interfaces/habit';
import { useI18n } from 'vue-i18n';
import SvgImage from '@/components/SvgImage.vue';
import MyHabitModal from '@/components/modals/MyHabitModal.vue';
import { useHabitStore } from '@/stores/habit';
import { computed, markRaw } from 'vue';
import { useModalStore } from '@/stores/modal';

interface Props {
    habit: Habit;
}

const { t } = useI18n();
const props = defineProps<Props>()
const habitStore = useHabitStore();
const modalStore = useModalStore();

const openMyHabitModal = (): void => {
    modalStore.component = markRaw(MyHabitModal);
    modalStore.title = t('progress.myProgress');
    modalStore.description = t('progress.myProgressDescription');
    modalStore.habitId = props.habit.id;
    modalStore.showModal();
}

const habitStatusMsg = computed(() => {
    const status: HabitStatusInfo = getStatus(props.habit);
    return t(status.msg);
});

const habitStatusClass = computed(() => {
    const status: HabitStatusInfo = getStatus(props.habit);
    return status.class;
});

const isComplete = computed(() => props.habit.status === HabitStatus.Complete);

const formattedDeadlineDate = computed(() => {
    return props.habit.deadline ? formatDate(props.habit.deadline) : 'N/A';
});

const formattedTime = computed(() => {
    const start: string = props.habit.startTime ? formatTime(props.habit.startTime) : 'N/A';
    const end: string = props.habit.endTime ? formatTime(props.habit.endTime) : 'N/A';
    return `${start} - ${end}`;
});

const habitCompletionStats = computed(() => {
    const habitInstances: Habit[] = habitStore.habits.filter(x => x.id === props.habit.id);
    return {
        completed: habitInstances.filter(x => x.status === HabitStatus.Complete).length,
        total: habitInstances.length
    };
});
</script>

<style scoped lang="scss">
.habit-card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: $radius-medium;
    background-color: var(--card-bg);
    color: var(--color);
    box-shadow: var(--card-shadow-color) 0px 1px 4px;
    padding: $spacing-large;

    @include media-query(tablet) {
        padding: $spacing-medium;
    }

    &-title {
        border-top: dotted 1px var(--color);
        word-wrap: break-word;
        padding: $spacing-large 0 $spacing-large 0;
        height: 100%;
        border-bottom: dotted 1px var(--color);
    }

    &-title.complete {
        text-decoration: line-through;
    }

    &-info {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: $spacing-medium;
        padding: $spacing-medium 0 0 0;
    }

    &-deadline {
        display: grid;
        gap: $spacing-medium;
        grid-template-columns: 1fr 1fr;
    }

    &-deadline-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: $spacing-min-small;
    }
}

.habit-card-actions {
    padding: 0 0 $spacing-medium 0;
    display: grid;
    grid-template-columns: auto 1fr;

    &-items {
        display: flex;
        gap: $spacing-small;
        justify-content: right;
    }
}

.default-icon-color {
    fill: var(--color);
}

.btn-size {
    min-width: 50px;
}
</style>
