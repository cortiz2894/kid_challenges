<template>
    <div ref="pointer" id="pointer">
        <div class="main-circle"></div>
        <div class="draggable">
            <svg width="60" height="60">
                <circle class="drag-circle" cx="30" cy="30" r="25"></circle>
            </svg>
        </div>
        <div class="arrows"></div>
        <div class="text">
            <span ref="pointerText"></span>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
import { useMouse } from "@vueuse/core";

export default {
    components: {},
    data() {
        const mouse = useMouse();
        const { transitionState } = usePageTransition();
        return { mouse, transitionState };
    },
    mounted() {
        /**
         * Bind: MouseMove Event Listeners.
         */
        window.addEventListener("mousemove", this.updateCursor, false);
        window.addEventListener("onPageFinish", this.reset, false);
        window.addEventListener("resetCursor", this.reset, false);
        this.create();
    },
    unmounted() {
        /**
         * Remove: MouseMove Event Listeners.
         */
        window.removeEventListener("mousemove", this.updateCursor, false);
        window.removeEventListener("onPageFinish", this.reset, false);
        window.removeEventListener("resetCursor", this.reset, false);
        this.reset();
    },
    watch: {
        transitionState: {
            deep: true,
            handler() {
                this.reset();
            },
        },
    },
    methods: {
        create() {
            this.bindHovers();
            this.bindDraggables();
        },
        unbind() {
            this.unbindHovers();
            this.unbindDraggables();
        },
        reset() {
            this.unbind();
            this.create();
        },
        updateCursor() {
            gsap.to(this.$refs["pointer"], 0.7, {
                left: this.mouse.x - 50 + "px",
                top: this.mouse.y - 50 - window.scrollY + "px",
                ease: "Power3.easeOut",
            });
        },
        bindHovers() {
            const hoverables = document.querySelectorAll(".hoverable");
            hoverables.forEach((e) => {
                e.addEventListener("mouseenter", this.setCursorHover);
                e.addEventListener("mouseleave", this.unsetCursorHover);
            });
        },
        unbindHovers() {
            const hoverables = document.querySelectorAll(".hoverable");
            hoverables.forEach((e) => {
                e.removeEventListener("mouseenter", this.setCursorHover);
                e.removeEventListener("mouseleave", this.unsetCursorHover);
            });
        },
        setCursorHover(e) {
            this.$refs["pointer"].classList.add("hide");
            const text = e.target.getAttribute("data-pointer-text");
            if (text != null) {
                this.$refs["pointer"].classList.add("display-text", "on-hover");
                this.$refs["pointerText"].innerHTML = text;
            }
        },
        unsetCursorHover() {
            this.$refs["pointer"].classList.remove("hide");
            this.$refs["pointer"].classList.remove("display-text", "on-hover");
        },
        setCursorDrag() {
            this.$refs["pointer"].classList.add("drag");
            this.$refs["pointer"].classList.remove("display-text", "on-hover");
            setTimeout(() => {
                this.$refs["pointerText"].innerHTML = "";
            }, 200);
        },
        unsetCursorDrag() {
            this.$refs["pointer"].classList.remove("drag");
            this.$refs["pointer"].classList.remove("display-text", "on-hover");
        },
        setCursorText(e) {
            const text = e.target.getAttribute("data-pointer-text");
            if (text != null) {
                this.$refs["pointer"].classList.add("display-text", "on-hover");
                this.$refs["pointerText"].innerHTML = text;
            }
        },
        bindDraggables() {
            const draggables = document.querySelectorAll(".drag-hold");
            draggables.forEach((e) => {
                e.addEventListener("mouseenter", this.setCursorText, true);
                e.addEventListener("mousedown", this.setCursorDrag, true);
                e.addEventListener("mouseup", this.unsetCursorDrag, true);
                e.addEventListener("mouseleave", this.unsetCursorDrag, true);
            });
        },
        unbindDraggables() {
            const draggables = document.querySelectorAll(".drag-hold");
            draggables.forEach((e) => {
                e.removeEventListener("mouseenter", this.setCursorText, true);
                e.removeEventListener("mousedown", this.setCursorDrag, true);
                e.removeEventListener("mouseup", this.unsetCursorDrag, true);
                e.removeEventListener("mouseleave", this.unsetCursorDrag, true);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
#pointer {
    position: fixed;
    width: 100px;
    height: 100px;
    pointer-events: none;
    z-index: 6000;
    top: 50%;
    left: 50%;
    opacity: 1;

    .main-circle {
        position: absolute;
        top: 50%;
        transform: scale(1) translateY(-50%);
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 10px;
        height: 10px;
        background: #58ead2;
        border-radius: 50%;
        transition: all 0.5s cubic-bezier(0.37, 0.01, 0, 0.98);
    }

    &.hide {
        .main-circle {
            transition: all 0.3s;
            opacity: 0.2;
            width: 60px;
            height: 60px;
        }

        &:not(.on-hover) .text {
            opacity: 0;
            bottom: 10px;
            transition-delay: 0s;
        }
    }

    &.drag {
        .main-circle {
            width: 0;
            height: 0;
        }
        .arrows {
            width: 80px;
            opacity: 1;
            transition-delay: 0.2s;
        }
        .draggable {
            .drag-circle {
                stroke-dasharray: 200;
                opacity: 1;
                transform: scale(1) rotate(280deg);
            }
        }
    }

    &.display-text {
        .text {
            opacity: 1;
            bottom: 20px;
        }
        &.on-hover {
            .text {
                bottom: 0;
            }
        }
    }

    .draggable {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        transform: translateY(-50%);

        .drag-circle {
            fill: transparent;
            stroke: #58ead2;
            stroke-width: 2px;
            stroke-dasharray: 60;
            transition: all 1s cubic-bezier(0.37, 0.01, 0, 0.98),
                stroke-dasharray 2s 0.2s cubic-bezier(0.37, 0.01, 0, 0.98);
            stroke-dashoffset: 0;
            opacity: 0;
            transform: scale(0) rotate(0);
            transform-origin: center;
        }
    }

    .arrows {
        position: absolute;
        top: 50%;
        transform: scale(1) translateY(-50%);
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 39px;
        color: #00eed2;
        transition: all 0.5s cubic-bezier(0.37, 0.01, 0, 0.98);
        display: flex;
        opacity: 0;
        justify-content: space-between;

        svg {
            width: 10px !important;
        }
    }

    .text {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 200px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        font-weight: 100;
        letter-spacing: 0;
        transition: all 0.3s;
        transform: translateX(-50%);
        opacity: 0;

        span {
            position: relative;
            background: #343434;
            padding: 5px 8px;
            white-space: nowrap;
        }
    }
}
</style>
