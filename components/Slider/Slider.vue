<template>
    <section class="slider">
        <ul>
            <li
                v-for="i in items"
                :key="i"
                class="item-slide"
                :class="{ active: i.active, next: i.next }"
                :ref="{ active: i.active }"
            >
                <p>{{ i.copy }}</p>
                <img :src="`img/${i.image}.jpeg`" />
            </li>
        </ul>
        <div class="tabs-container">
            <ul class="tabs">
                <li
                    v-for="item in items"
                    :key="item.title"
                    class="item-tab"
                    :class="{ active: item.active }"
                >
                    <span>{{ `0${item.id}` }}</span>
                    <p>{{ item.title }}</p>
                </li>
            </ul>
            <div class="action-btn" @click="next">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"
                    />
                </svg>
            </div>
        </div>
    </section>
</template>

<script>
import { gsap } from "gsap";

export default {
    props: ["items"],
    data() {
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
        return {
            items,
            timer: null,
            currentIndex: 0,
            prevIndex: items.length,
        };
    },
    mounted() {
        this.items[
            Math.abs(this.currentIndex + 1) % this.items.length
        ].next = true;
        this.items[
            Math.abs(this.currentIndex) % this.items.length
        ].active = true;
    },
    methods: {
        next: function () {
            //make refator here
            this.currentIndex += 1;
            delete this.items[
                Math.abs(this.currentIndex - 1) % this.items.length
            ].active;
            this.items[
                Math.abs(this.currentIndex) % this.items.length
            ].active = true;
            delete this.items[Math.abs(this.currentIndex) % this.items.length]
                .next;
            this.items[
                Math.abs(this.currentIndex + 1) % this.items.length
            ].next = true;

            //animate
            gsap.to(this.$refs.active, {
                scale: 20,
                duration: 0.4,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.slider {
    height: 600px;
    position: relative;
    overflow: hidden;
    width: 100%;
    ul {
        position: relative;
        width: 100%;
        display: block;
        height: 100%;
    }
    .item-slide {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        overflow: hidden;
        min-width: 0;
        z-index: 0;

        img {
            height: 100%;
        }
        p {
            position: absolute;
            color: white;
            width: 100%;
            padding: 0.7em 0.5em;
            font-weight: 800;
            font-size: 2em;
            background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.72) 13%,
                rgba(0, 0, 0, 0) 100%
            );
        }
        &.active {
            z-index: 1;
            width: 100%;
            transition: width 0.5s ease-in-out;
        }
        &.next {
            width: 0;
            z-index: 3;
            & + li {
                display: none;
            }
        }
    }
    .tabs-container {
        display: flex;
        width: 100%;
        align-items: flex-end;
        position: absolute;
        height: 100%;
        top: 0;
        z-index: 5;
        background: linear-gradient(
            0deg,
            rgb(0 0 0 / 17%) 10%,
            rgba(0, 0, 0, 0) 20%
        );
        .action-btn {
            color: #fff;
        }
        .tabs {
            display: flex;
            padding: 1em;
            width: 90%;
            height: auto;
            li {
                display: flex;
                flex-direction: column;
                color: white;
                font-size: 1em;
                padding-bottom: 1em;
                border-bottom: 2px solid rgba(255, 255, 255, 0.5);
                margin-right: 0.3em;
                width: 17%;
                position: relative;

                p {
                    opacity: 0;
                }
                span {
                    color: rgba(255, 255, 255, 0.5);
                }
                &.active {
                    width: 32%;

                    &::before {
                        width: 100%;
                    }
                    p {
                        opacity: 1;
                    }
                    span {
                        color: rgba(255, 255, 255, 1);
                    }
                }
                &::before {
                    content: "";
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    background: white;
                    height: 2px;
                    transition: width 0.5s ease-in-out;
                }
            }
        }
    }
}
</style>