<template>
    <div class="container-menu" @click="open()">
        <button class="burger" :class="{ active: isActive }">
            <div class="icon"></div>
            <div class="icon"></div>
        </button>
        <div class="background"></div>
    </div>
</template>

<script>
export default {
    props: ["content"],
    data() {
        const isActive = false;
        return { isActive };
    },
    mounted() {},
    methods: {
        open() {
            this.isActive = !this.isActive;
        },
    },
};
</script>

<style lang="scss" scoped>
.container-menu {
    width: 70px;
    height: 70px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .background {
        position: absolute;
        border-radius: 50%;
        background: black;
        width: 10px;
        height: 10px;
        bottom: 0;
        transform: scale(0);
        z-index: 0;
        opacity: 0;
        transition: transform 0.2s ease-out, bottom 0.2s ease-out,
            opacity 0.2s ease;
    }
    .burger {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        border: none;
        background: none;
        cursor: pointer;
        z-index: 1;
        .icon {
            width: 40px;
            height: 3px;
            background-color: #ed675f;
            transition: all 0.5s ease;

            &:nth-of-type(1) {
                margin-bottom: 8px;
            }
        }

        &.active {
            .icon {
                background-color: #0d0e0f;
                &:nth-of-type(1) {
                    transform: rotate(45deg);
                    margin-bottom: 0;
                    transform-origin: 45%;
                }
                &:nth-of-type(2) {
                    transform: rotate(-45deg);
                    transform-origin: 45%;
                }
            }
        }
    }

    &:hover {
        .background {
            transform: scale(7);
            bottom: calc(50% - 5px);
            opacity: 1;
        }
        .burger {
            .icon {
                background-color: #fff;
            }
        }
    }
}
</style>
