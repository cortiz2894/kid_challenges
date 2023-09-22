<template>
    <div>
        <div class="loader" ref="loader">
            <div class="wrapper">
                <LoaderLogo />
                <LoaderCircleSpinner />
            </div>
        </div>

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script>
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoaderCircleSpinner from "~/assets/img/nuxt-skeleton-default/loader-circle-spinner.svg";
import LoaderLogo from "~/assets/img/nuxt-skeleton-default/loader-logo.svg";

export default {
    components: { LoaderCircleSpinner, LoaderLogo },
    data() {
        const loaded = ref(false);
        return {
            loaded,
        };
    },
    mounted() {
        const _this = this;
        gsap.registerPlugin(ScrollTrigger);

        /**
         * Initial settings for scroll position.
         */
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);

        /**
         * Loader: Animation In.
         */
        gsap.delayedCall(0.5, function () {
            _this.loaderAnimationIn();
        });

        /**
         * Bowser setup.
         */
        useBowser();

        /**
         * Fonts to load.
         */
        const SFProDisplayLight = {
            name: "SF-Pro-Display",
            weight: 300,
        };

        const SFProDisplayRegular = {
            name: "SF-Pro-Display",
            weight: 400,
        };

        /**
         * Font Loader.
         */
        useFontLoader([SFProDisplayLight, SFProDisplayRegular]);

        /**
         * Image Loader.
         */
        useImageLoader('img:not([loading="lazy"])');

        /**
         * Loader Minimum Delay
         */
        useMinDelay(1000);

        /**
         * Loading Event Listeners.
         */
        var fontsLoaded = new Promise(function (resolve) {
            window.addEventListener("fontsLoaded", resolve, false);
        });

        var imagesLoaded = new Promise(function (resolve) {
            window.addEventListener("imagesLoaded", resolve, false);
        });

        var minDelayCompleted = new Promise(function (resolve) {
            window.addEventListener("minDelayCompleted", resolve, false);
        });

        /**
         * Loader: Everything is ready.
         */
        Promise.all([fontsLoaded, imagesLoaded, minDelayCompleted]).then(
            function () {
                /**
                 * Loader: Animation Out.
                 */
                gsap.delayedCall(0.5, function () {
                    _this.loaderAnimationOut();
                });

                /**
                 * Start SmoothScroll
                 */
                window.lenis = new Lenis();
                window.lenis.on("scroll", ScrollTrigger.update);

                gsap.ticker.add((time) => {
                    window.lenis.raf(time * 1000);
                });

                gsap.ticker.lagSmoothing(0);
            }
        );
    },
    methods: {
        loaderAnimationIn: function () {
            gsap.timeline()
                .to(
                    document.querySelector(".w-logo"),
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "power1",
                    },
                    0
                )
                .to(
                    document.querySelector(".loader-circle-spinner"),
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power1",
                    },
                    0.1
                );
        },
        loaderAnimationOut: function () {
            gsap.timeline({
                onComplete: function () {
                    this.loaded = true;
                    window.dispatchEvent(new CustomEvent("loaderComplete"));
                },
            })
                .to(
                    document.querySelector(".w-logo"),
                    {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "power1",
                        stagger: 0.05,
                    },
                    "<+=0.52"
                )
                .to(
                    document.querySelector(".loader-circle-spinner"),
                    {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: "power1",
                        stagger: 0.05,
                    },
                    "<+=0.32"
                )
                .to(
                    this.$refs["loader"],
                    {
                        autoAlpha: 0,
                    },
                    "<"
                );
        },
    },
};
</script>

<style lang="scss">
.loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 5000;
    pointer-events: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #111;

    .wrapper {
        width: 160px;
        height: 160px;
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%) translateY(-50%);
        pointer-events: none;

        .w-logo {
            position: absolute;
            width: 39px;
            height: auto;
        }

        .circle--rotation {
            width: 100%;
            height: 100%;
            animation: circleRotation 1.5s linear infinite;
            animation-duration: 1.5s;
            animation-timing-function: linear;
            animation-delay: 0s;
            animation-iteration-count: infinite;
            animation-direction: normal;
            animation-fill-mode: none;
            animation-play-state: running;
            animation-name: circleRotation;
        }
    }

    @keyframes circleRotation {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(1turn);
        }
    }
}
</style>
