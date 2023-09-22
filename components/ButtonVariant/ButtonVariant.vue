<template>
    <div class="container-btn">
        <div class="background"></div>
        <button class="btn">
            {{ content }}
        </button>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"
            />
        </svg>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    props: ["content"],
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.container-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    padding: 5px 5px;
    margin-left: 25px;
    &:hover {
        .background {
            width: 30%;
        }
        svg {
            transform: translate(0px, 0px);
            opacity: 1;
        }
        .btn {
            color: black;
            transform: translate(-15px, 0px);
            transition: transform 0.27s ease-out;
            transition-delay: 0;
        }
    }
}
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    border-radius: 30px;
    transition: width 0.2s ease-out;
    right: 0;
}
svg {
    color: #fff;
    transform: translate(-20px, 0px);
    opacity: 0;
    transition: all 0.15s ease-out;
}
.btn {
    font-size: 18px;
    border: none;
    background: none;
    position: relative;
    padding: 0px;
    color: white;
    cursor: pointer;
    transform: translate(15px, 0px);
    transition: transform 0.35s ease-out;
}
</style>
