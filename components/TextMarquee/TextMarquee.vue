<template>
    <section class="hero-section">
        <div class="loop-container" id="container-marquee">
            <div class="item" id="text">{{ content }}&nbsp;</div>
        </div>
    </section>
</template>

<script>
import LoopingText from "~/helpers/marqee";

export default {
    props: ["content", "direction", "speed"],
    data() {},
    mounted() {
        const node = document.getElementById("text");
        const clone = node.cloneNode(true);
        document.getElementById("container-marquee").appendChild(clone);
        document
            .querySelectorAll(".loop-container")
            .forEach(
                (el) =>
                    new LoopingText(
                        el,
                        this.direction == "left" ? -1 : 1,
                        this.speed
                    )
            );
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
/* force some scrollbars */
body {
    min-height: 400vh;
}
.hero-section {
    position: relative;
    overflow: hidden;
    font-size: 40px;
    font: 900 9vw/1 sans-serif;
    min-height: 100vh;
}
</style>
