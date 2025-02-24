<template>
    <div class="modal-bg" @keyup.esc="hideModal()" tabindex="-1">
        <div class="modal" ref="modal">
            <button type="button" :aria-label="t('buttonsLabels.closeModal')" @click="hideModal()"
                class="modal-close-container">
                <SvgImage :alt="t('imagesAlt.closeImg')" name="close" folder="globals" width="18" height="18"
                    class="modal-close-icon" />
            </button>
            <div class="modal-header">
                <h1 class="font-montserrat-28-bold">{{ modalStore.title }}</h1>
                <p class="modal-header-description font-montserrat-16-regular">
                    {{ modalStore.description }}
                </p>
            </div>
            <div class="modal-main">
                <HabitForm />
                <div class="modal-error-container" v-if="habitFormStore.hasNonEmptyErrors">
                    <div v-for="(message, index) in habitFormStore.nonEmptyErrors" :key="index">
                        <span class="modal-error-message font-montserrat-12-bold">
                            {{ `${index + 1} ${t(message.msg)}` }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer layout-right-center">
                <button type="button" :aria-label="t('buttonsLabels.cancelAction')"
                    class="modal-btn-cancel font-montserrat-14-regular" @click="hideModal()">
                    {{ t("modal.buttons.cancel") }}
                </button>
                <button type="button" :aria-label="t('buttonsLabels.submitForm')"
                    :disabled="!habitFormStore.isFormValid || !habitFormStore.isChanged()" @click="submit()"
                    class="modal-btn-confirm font-montserrat-14-bold">
                    {{ modalStore.btnSubmitText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useModalStore } from "@/stores/modal";
import { onClickOutside } from "@vueuse/core";
import { useNotification } from "@kyvg/vue3-notification";
import SvgImage from "@/components/SvgImage.vue";
import HabitForm from "@/components/habit/HabitForm.vue";
import { useHabitFormStore } from "@/stores/habitForm";

const { t } = useI18n();
const { notify } = useNotification();
const modalStore = useModalStore();
const habitFormStore = useHabitFormStore();
const modal = ref(null);

const submit = (): void => {
    if (modalStore.habitModalSubmitAction !== null) {
        modalStore.habitModalSubmitAction(habitFormStore.habitForm);
        notify({
            title: modalStore.notificationSuccessTitle,
            text: modalStore.notificationSuccessDescription,
            type: "success",
        });
        modalStore.hideModal();
    } else {
        notify({
            title: t("notification.error.title"),
            text: t("notification.error.description"),
            type: "error",
        });
        modalStore.hideModal();
    }
};

const hideModal = (): void => {
    modalStore.hideModal();
    habitFormStore.clearHabitFormState();
};

onClickOutside(modal, () => {
    hideModal();
});
</script>

<style setup lang="scss">
@use "@/styles/modal" as *;
</style>
