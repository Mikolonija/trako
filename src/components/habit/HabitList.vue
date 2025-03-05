<template>
  <div class="habit-list">
    <div class="habit-list-header">
      <h2 class="font-montserrat-28-bold">{{ t('habitList.title') }}</h2>
      <div class="habit-list-date-container">
        <p class="font-montserrat-14-regular">{{ habitStore.formattedHabitFilterDates }}</p>
      </div>
    </div>
    <div class="habit-menu">
      <p
        class="habit-menu-item font-montserrat-16-regular"
        :class="{ active: habitStore.isHabitActive }"
        @click="changeSelection(HabitActivationStatus.Enable)"
      >
        {{ t('habitList.selected.active') }}
      </p>
      <p
        class="habit-menu-item font-montserrat-16-regular"
        :class="{ active: !habitStore.isHabitActive }"
        @click="changeSelection(HabitActivationStatus.Disable)"
      >
        {{ t('habitList.selected.inactive') }}
      </p>
    </div>
    <div class="habit-list-main">
      <div class="habit-list-card">
        <template v-if="visibleHabits.length > 0">
          <HabitCard :habit="habit" v-for="(habit, i) in visibleHabits" :key="i">
            <template #actions>
              <button
                type="button"
                :title="t('buttonsLabels.enableHabit')"
                :aria-label="t('buttonsLabels.enableHabit')"
                class="cancel-btn-round layout-center"
                @keyup.esc="modalStore.hideModal()"
                v-if="!habitStore.isHabitActive"
                @click="openEnableModal(habit)"
              >
                <SvgImage
                  :alt="t('imagesAlt.unlockImg')"
                  name="unlock"
                  folder="habitCard"
                  class="default-icon-color"
                />
              </button>
              <button
                type="button"
                :title="t('buttonsLabels.disableHabit')"
                :aria-label="t('buttonsLabels.disableHabit')"
                @keyup.esc="modalStore.hideModal()"
                class="cancel-btn-round layout-center"
                v-if="habitStore.isHabitActive"
                @click="openDisableModal(habit)"
              >
                <SvgImage
                  :alt="t('imagesAlt.lockImg')"
                  name="lock"
                  folder="habitCard"
                  class="default-icon-color"
                />
              </button>
              <button
                data-testid="cy-open-edit-habit-modal-btn"
                type="button"
                :title="t('buttonsLabels.editHabit')"
                :aria-label="t('buttonsLabels.editHabit')"
                @keyup.esc="modalStore.hideModal()"
                v-if="habitStore.isHabitActive"
                class="cancel-btn-round"
                @click="openEditModal(habit)"
              >
                <SvgImage
                  :alt="t('imagesAlt.editImg')"
                  name="edit"
                  folder="habitCard"
                  class="default-icon-color"
                />
              </button>
              <button
                data-testid="cy-open-delete-habit-modal-btn"
                type="button"
                :title="t('buttonsLabels.deleteHabit')"
                :aria-label="t('buttonsLabels.deleteHabit')"
                @keyup.esc="modalStore.hideModal()"
                class="cancel-btn-round"
                @click="openDeleteModal(habit)"
              >
                <SvgImage
                  :alt="t('imagesAlt.deleteImg')"
                  name="delete"
                  folder="habitCard"
                  class="default-icon-color"
                />
              </button>
              <button
                data-testid="cy-open-mark-habit-modal-btn"
                type="button"
                :title="t('buttonsLabels.markHabit')"
                :aria-label="t('buttonsLabels.markHabit')"
                @keyup.esc="modalStore.hideModal()"
                class="cancel-btn-round layout-center"
                v-if="
                  shouldUpdateHabitStatus(habit, HabitStatus.Unfinished) && habitStore.isHabitActive
                "
                @click="openMarkModal(habit)"
              >
                <SvgImage
                  name="deselected"
                  :alt="t('imagesAlt.deselectedImg')"
                  folder="habitCard"
                  class="default-checkbox-color"
                />
              </button>
              <button
                type="button"
                :title="t('buttonsLabels.unmarkHabit')"
                :aria-label="t('buttonsLabels.unmarkHabit')"
                @keyup.esc="modalStore.hideModal()"
                class="cancel-btn-round layout-center"
                v-if="
                  shouldUpdateHabitStatus(habit, HabitStatus.Complete) && habitStore.isHabitActive
                "
                @click="openUnmarkModal(habit)"
              >
                <SvgImage
                  :alt="t('imagesAlt.selectedImg')"
                  name="selected"
                  folder="habitCard"
                  class="default-checkbox-color"
                />
              </button>
            </template>
          </HabitCard>
        </template>
        <template v-else>
          <div class="layout-center empty-habits-image-container">
            <SvgImage
              :alt="t('imagesAlt.emptyImg')"
              @click="openCreateModal()"
              name="empty_habits"
              folder="globals"
              class="empty-habits-image"
            />
          </div>
        </template>
      </div>
    </div>
    <div class="load-more layout-center">
      <button
        type="button"
        :aria-label="t('buttonsLabels.loadMore')"
        class="loaded-more-btn font-montserrat-14-bold"
        v-if="habitStore.loadedMore < filteredHabits.length"
        @click="loadMore"
      >
        {{ t('progress.loadMore') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HabitModal from '@/components/modals/HabitModal.vue';
import ConfirmModal from '@/components/modals/ConfirmModal.vue';
import HabitCard from '@/components/habit/HabitCard.vue';
import SvgImage from '@/components/SvgImage.vue';
import { useHabitStore } from '@/stores/habit';
import { useHabitFormStore } from '@/stores/habitForm';
import { useModalStore } from '@/stores/modal';
import type { Habit } from '@/types/interfaces/habit';
import { computed, markRaw } from 'vue';
import { HabitActivationStatus, HabitStatus, SpaceCleanOption } from '@/types/enums/habit';
import { useI18n } from 'vue-i18n';
import { uuid } from 'vue-uuid';
import { cleanSpaces } from '@/utils/helpers';
import { defaultLoadedMore } from '@/config';

const { t } = useI18n();
const habitStore = useHabitStore();
const habitFormStore = useHabitFormStore();
const modalStore = useModalStore();

const visibleHabits = computed(() => {
  return filteredHabits.value.slice(0, habitStore.loadedMore);
});

const filteredHabits = computed(() => {
  const [startDate, endDate]: number[] = habitStore.dateRange.map((date) =>
    new Date(date).setHours(0, 0, 0, 0),
  );
  return habitStore.habits
    .filter((habit) => {
      const habitDate: number = new Date(habit.deadline).setHours(0, 0, 0, 0);
      return (
        habitDate >= startDate &&
        habitDate <= endDate &&
        habit.isActive === habitStore.habitSelected
      );
    })
    .sort((a, b) => {
      const deadlineA: number = new Date(a.deadline).getTime();
      const deadlineB: number = new Date(b.deadline).getTime();
      if (deadlineA === deadlineB) {
        return a.startTime.hours - b.startTime.hours || a.startTime.minutes - b.startTime.minutes;
      }
      return deadlineA - deadlineB;
    });
});

const loadMore = (): void => {
  habitStore.loadedMore += defaultLoadedMore;
};

const shouldUpdateHabitStatus = (habit: Habit, status: HabitStatus): boolean => {
  const yesterday: number = new Date().setHours(0, 0, 0, 0);
  const deadline: number = new Date(habit.deadline).setHours(0, 0, 0, 0);
  return yesterday >= deadline && habit.status === status;
};

const changeSelection = (isHabitActive: HabitActivationStatus): void => {
  habitStore.changeHabitSelection(isHabitActive);
};

const openCreateModal = (): void => {
  modalStore.component = markRaw(HabitModal);
  modalStore.habitModalSubmitAction = (habitFormState: Habit) =>
    habitStore.createHabit({
      ...habitFormState,
      id: uuid.v1(),
      name: cleanSpaces(habitFormState.name, SpaceCleanOption.TrimAndReplace),
    });
  modalStore.notificationSuccessDescription = t(
    'modal.createHabit.successNotification.description',
  );
  modalStore.notificationSuccessTitle = t('modal.createHabit.successNotification.title');
  modalStore.btnSubmitText = t('modal.buttons.create');
  modalStore.title = t('modal.createHabit.title');
  modalStore.description = t('modal.createHabit.description');
  habitFormStore.setHabitForm(habitStore.habit);
  modalStore.showModal();
};

const openDisableModal = (habit: Habit): void => {
  modalStore.component = markRaw(ConfirmModal);
  modalStore.confirmModalSubmitAction = () =>
    habitStore.changeHabitActivationStatus(habit, HabitActivationStatus.Disable);
  modalStore.bodyText = t('modal.disableHabit.text');
  modalStore.notificationSuccessDescription = t('modal.disableHabit.success.description');
  modalStore.notificationSuccessTitle = t('modal.disableHabit.success.title');
  modalStore.btnSubmitText = t('modal.buttons.confirm');
  modalStore.title = t('modal.disableHabit.title');
  modalStore.showModal();
};

const openEnableModal = (habit: Habit): void => {
  modalStore.component = markRaw(ConfirmModal);
  modalStore.confirmModalSubmitAction = () =>
    habitStore.changeHabitActivationStatus(habit, HabitActivationStatus.Enable);
  modalStore.bodyText = t('modal.enableHabit.text');
  modalStore.notificationSuccessDescription = t('modal.enableHabit.success.description');
  modalStore.notificationSuccessTitle = t('modal.enableHabit.success.title');
  modalStore.btnSubmitText = t('modal.buttons.confirm');
  modalStore.title = t('modal.enableHabit.title');
  modalStore.showModal();
};

const openMarkModal = (habit: Habit): void => {
  modalStore.component = markRaw(ConfirmModal);
  modalStore.confirmModalSubmitAction = () =>
    habitStore.changeHabitStatus(habit, HabitStatus.Complete);
  modalStore.bodyText = t('modal.confirmHabitStatusChange.text');
  modalStore.notificationSuccessDescription = t(
    'modal.confirmHabitStatusChange.success.description',
  );
  modalStore.notificationSuccessTitle = t('modal.confirmHabitStatusChange.success.title');
  modalStore.btnSubmitText = t('modal.buttons.confirm');
  modalStore.title = t('modal.confirmHabitStatusChange.title');
  modalStore.showModal();
};

const openUnmarkModal = (habit: Habit): void => {
  modalStore.component = markRaw(ConfirmModal);
  modalStore.confirmModalSubmitAction = () =>
    habitStore.changeHabitStatus(habit, HabitStatus.Unfinished);
  modalStore.bodyText = t('modal.unmarkHabitStatus.text');
  modalStore.notificationSuccessDescription = t('modal.unmarkHabitStatus.success.description');
  modalStore.notificationSuccessTitle = t('modal.unmarkHabitStatus.success.title');
  modalStore.btnSubmitText = t('modal.buttons.confirm');
  modalStore.title = t('modal.unmarkHabitStatus.title');
  modalStore.showModal();
};

const openDeleteModal = (habit: Habit): void => {
  modalStore.component = markRaw(ConfirmModal);
  modalStore.confirmModalSubmitAction = () => habitStore.deleteHabit(habit);
  modalStore.bodyText = t('modal.deleteHabit.text');
  modalStore.notificationSuccessDescription = t('modal.deleteHabit.success.description');
  modalStore.notificationSuccessTitle = t('modal.deleteHabit.success.title');
  modalStore.btnSubmitText = t('modal.buttons.delete');
  modalStore.title = t('modal.deleteHabit.title');
  modalStore.isDeleteAction = true;
  modalStore.showModal();
};

const openEditModal = (habit: Habit): void => {
  modalStore.component = markRaw(HabitModal);
  modalStore.habitModalSubmitAction = (habitFormState) =>
    habitStore.updateHabit({
      ...habitFormState,
      name: cleanSpaces(habitFormState.name, SpaceCleanOption.TrimAndReplace),
    });
  modalStore.notificationSuccessTitle = t('modal.editHabit.successNotification.title');
  modalStore.notificationSuccessDescription = t('modal.editHabit.successNotification.description');
  modalStore.btnSubmitText = t('modal.buttons.update');
  modalStore.title = t('modal.editHabit.title');
  modalStore.description = t('modal.editHabit.description');
  habitFormStore.setHabitForm(habit);
  modalStore.showModal();
};
</script>

<style scoped lang="scss">
.habit-list {
  margin: $spacing-xx-large 0 0 0;

  &-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 0 $spacing-xx-large 0;
    gap: $spacing-medium;
  }

  &-date-container {
    background-color: var(--habit-card-info-bg);
    color: var(--habit-card-info-color);
    border-radius: $radius-small;
    padding: $spacing-small $spacing-medium;

    @include media-query(tablet) {
      width: 100%;
      text-align: center;
    }
  }

  &-card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: $spacing-medium;
    grid-template-rows: 1fr;

    @include media-query(tablet) {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
}

.habit-menu {
  border-bottom: solid 1px var(--color);
  margin-bottom: $spacing-large;
  display: flex;
  gap: $spacing-small;

  &-item {
    padding: 0 0 $spacing-small 0;
    cursor: pointer;
  }

  &-item.active {
    font-weight: 600;
    border-bottom: solid 2px var(--color);
  }
}

.default-icon-color {
  fill: none;
}

.default-checkbox-color {
  fill: var(--checkbox-color);
}

.empty-habits-image-container {
  width: 100%;
}

.empty-habits-image {
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  height: auto;
}

.load-more {
  margin: $spacing-large 0 0 0;
}
</style>
