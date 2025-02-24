<template>
    <div class="habit-info-card">
        <h2 class="font-montserrat-28-bold">
            {{ t('infoCard.title') }}
        </h2>
        <p class="habit-info-card-description font-montserrat-16-regular">
            {{ t('infoCard.description') }}
        </p>
        <div class="habit-info-card-btn-position">
            <button type="button" :aria-label="t('buttonsLabels.openCreateHabitModal')"
                class="confirm-btn font-montserrat-16-bold" @click="openCreateHabitModal()"
                @keyup.esc="hideCreateHabitModal()">
                {{ t('infoCard.btnText') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { markRaw } from 'vue';
import HabitModal from "@/components/modals/HabitModal.vue";
import { useI18n } from 'vue-i18n';
import { useHabitFormStore } from '@/stores/habitForm';
import { useHabitStore } from '@/stores/habit';
import { uuid } from 'vue-uuid';
import { cleanSpaces } from '@/utils/helpers';
import type { Habit } from '@/types/interfaces/habit';
import { HabitStatus, SpaceCleanOption } from '@/types/enums/habit';

const { t } = useI18n();
const modalStore = useModalStore();
const habitFormStore = useHabitFormStore();
const habitStore = useHabitStore();

const hideCreateHabitModal = (): void => {
    modalStore.hideModal();
    habitFormStore.clearHabitFormState();
}

const openCreateHabitModal = (): void => {
    modalStore.component = markRaw(HabitModal);
    habitFormStore.setHabitForm(habitStore.habit);
    modalStore.habitModalSubmitAction = (habitFormState: Habit) => {
        habitStore.createHabit({
            ...habitFormState,
            id: uuid.v1(),
            name: cleanSpaces(habitFormState.name, SpaceCleanOption.TrimAndReplace),
            status: HabitStatus.Unfinished
        });
    };
    modalStore.notificationSuccessDescription = t('modal.createHabit.successNotification.description');
    modalStore.notificationSuccessTitle = t('modal.createHabit.successNotification.title');
    modalStore.btnSubmitText = t('modal.buttons.create');
    modalStore.title = t('modal.createHabit.title');
    modalStore.description = t('modal.createHabit.description');
    modalStore.showModal();
}
</script>

<style scoped lang="scss">
.habit-info-card {
    color: var(--habit-creator-color);
    background: var(--habit-creator-bg);
    border-radius: $radius-medium;
    padding: $spacing-xx-large;

    &-description {
        padding: $spacing-small 0 0 0;
        line-height: 1.2;
    }

    &-btn-position {
        padding: $spacing-large 0 0 0;
    }

    @include media-query(tablet) {
        padding: $spacing-large;
    }
}
</style>
