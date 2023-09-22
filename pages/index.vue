<template>
    <div>
        <Head>
            <Title>KID Agency | Nuxt3 Boilerplate</Title>
            <Meta name="description" content="Page description" />
        </Head>
        <div class="container-slider">
            <Slider />
        </div>
        <div class="btn-group">
            <Button content="Browse all work" />
            <ButtonVariant content="Get in touch" />
            <ButtonVariant content="Careers page" />
        </div>
        <div class="btn-group">
            <Menu />
        </div>
        <TextMarquee
            content="This text will be infinite looping"
            direction="right"
            speed="2"
        />
    </div>
</template>

<script setup>
import pageTransitionDefault from "../helpers/pageTransitionDefault";

definePageMeta({
    pageTransition: pageTransitionDefault,
});
</script>
<style lang="scss" scoped>
.btn-group {
    display: flex;
    margin: 10em;
    margin-bottom: 10px;
}

.container-slider {
    width: 400px;
}
</style>
