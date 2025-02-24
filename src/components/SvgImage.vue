<template>
    <component v-if="useComponent" :is="icon" :fill="props.fill" :width="props.width" :height="props.height"
        :aria-label="props.alt" />
    <img v-else :src="iconSrc" :alt="props.alt" :width="props.width" :height="props.height" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from "vue";

interface Props {
    folder?: string;
    name?: string;
    fill?: string;
    width?: string;
    height?: string;
    useComponent?: boolean;
    iconSrc?: string;
    alt: string;
}

const props = withDefaults(defineProps<Props>(), {
    useComponent: true,
    width: "24",
    height: "24",
    fill: "#ffffff",
});

const icon = computed(() => {
    if (props.useComponent && props.folder && props.name) {
        return defineAsyncComponent(
            () => import(`@/assets/${props.folder}/${props.name}.svg`)
        );
    }
    return null;
});
</script>

<style scoped lang="scss"></style>
