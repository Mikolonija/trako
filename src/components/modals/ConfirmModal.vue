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
            </div>
            <div class="modal-main">
                <p class="font-montserrat-16-regular">{{ modalStore.bodyText }}</p>
            </div>
            <div class="modal-footer layout-right-center">
                <button type="button" :aria-label="t('buttonsLabels.cancelAction')"
                    class="modal-btn-cancel font-montserrat-14-regular" @click="hideModal()">
                    {{ t("modal.buttons.cancel") }}
                </button>
                <button type="button" :class="[modalStore.isDeleteAction ? 'modal-btn-delete' : 'modal-btn-confirm']"
                    :aria-label="t('buttonsLabels.confirmAction')" @click="submit()" class="font-montserrat-14-bold">
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
import SvgImage from "@/components/SvgImage.vue";
import { useNotification } from "@kyvg/vue3-notification";

const { t } = useI18n();
const { notify } = useNotification();
const modalStore = useModalStore();
const modal = ref(null);

const hideModal = (): void => {
    modalStore.hideModal();
};

const submit = (): void => {
    if (modalStore.confirmModalSubmitAction !== null) {
        modalStore.confirmModalSubmitAction();
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

onClickOutside(modal, () => {
    hideModal();
});
</script>

<style setup lang="scss">
@use "@/styles/modal" as *;
</style>
