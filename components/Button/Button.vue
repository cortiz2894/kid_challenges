<template>
    <div class="container-btn" @mouseenter="over()" @mouseleave="leave()">
        <div class="circle" ref="circle">
            <svg
                class="icon"
                ref="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"
                />
            </svg>
        </div>
        <button class="btn" ref="btn">
            {{ content }}
        </button>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    props: ["content"],
    data() {
        const tl = "";
        return { tl };
    },
    mounted() {
        const { circle, icon, btn } = this.$refs;
        this.tl = gsap
            .timeline({ paused: true })
            .to(circle, {
                background: "#000",
                duration: 0,
            })
            .to(circle, {
                scale: 4,
                duration: 0.25,
                ease: "Power4.easeOut",
            })
            .to(
                icon,
                {
                    x: 0,
                    ease: "Power4.easeOut",
                },
                0
            )
            .to(
                btn,
                {
                    x: 12,
                    duration: 0.25,
                },
                0
            );
    },
    methods: {
        over() {
            this.tl.restart();
        },
        leave() {
            this.tl.reverse();
        },
    },
};
</script>

<style lang="scss" scoped>
.container-btn {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    margin-right: 1em;
    &:hover {
        .btn {
            &:before {
                width: 0%;
            }
        }
    }
}
.icon {
    width: 6px;
    transform: translate(-20px, 0px);
}
.circle {
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #fff;
}
.btn {
    font-size: 18px;
    border: none;
    background: none;
    position: relative;
    padding: 0px;
    cursor: pointer;
    &:before {
        content: "";
        width: 100%;
        position: absolute;
        right: 0;
        bottom: -1px;
        height: 1px;
        background: black;
        transition: width 0.2s ease-out;
    }
}
</style>
