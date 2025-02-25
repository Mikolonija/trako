<template>
  <div class="not-fount-page-layout">
    <AnimationBubbles />
    <section class="info-container layout-centered-axis-xy">
      <h1 class="font-montserrat-36-bold">
        {{ t('notFound.title') }}
      </h1>
      <p class="info-container-description font-montserrat-16-regular">
        {{ t('notFound.message') }}
      </p>
      <div>
        <button
          type="button"
          :aria-label="t('buttonsLabels.notFound')"
          @click="goHome()"
          class="confirm-btn font-montserrat-14-bold"
        >
          {{ t('notFound.btnText') }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import AnimationBubbles from '@/components/AnimationBubbles.vue';

const router = useRouter();
const { t } = useI18n();

const goHome = (): void => {
  router.push('/');
};
</script>

<style scoped lang="scss">
.not-fount-page-layout {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.info-container {
  text-align: center;
  width: 500px;
  gap: $spacing-medium;
  display: grid;

  &-description {
    line-height: 1.2;
  }

  @include media-query(tablet) {
    width: 90%;
  }
}
</style>
