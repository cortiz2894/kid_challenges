<template>
    <div>
        <Head>
            <Title>KID Agency | Nuxt3 Boilerplate</Title>
            <Meta name="description" content="Page description" />
        </Head>
        <div class="container-slider">
            <Slider :items="items" />
        </div>
        <div class="btn-group">
            <Button
                content="Browse all work"
                href="https://google.com"
                target="__blank"
            />
            <ButtonVariant content="Get in touch" href="https://google.com" />
            <ButtonVariant
                content="Careers page"
                href="https://google.com"
                target="__blank"
            />
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

const items = [
    {
        id: 1,
        title: "Movie",
        image: "img1",
        copy: "The phantom menace",
    },
    {
        id: 2,
        title: "Movie",
        image: "img2",
        copy: "The attack of clones",
    },
    {
        id: 3,
        title: "Movie",
        image: "img3",
        copy: "Revenge of the sith",
    },
    { id: 4, title: "Movie", image: "img4", copy: "A new hope" },
    {
        id: 5,
        title: "Movie",
        image: "img5",
        copy: "Return of the jedi",
    },
];
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
