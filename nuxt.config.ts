// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["@/assets/scss/app.scss"],
    modules: ["@nuxtjs/i18n", "@nuxt/image", "@nuxtjs/device", "nuxt-icon"],
    i18n: {
        lazy: true,
        langDir: "locales",
        strategy: "prefix_except_default",
        defaultLocale: "en-US",
        vueI18n: "./config/i18n.config.ts",
        locales: [
            {
                code: "en-US",
                iso: "en-US",
                name: "English",
                file: "en-US.json",
            },
            {
                code: "es-ES",
                iso: "es-ES",
                name: "Español",
                file: "es-ES.json",
            },
        ],
    },
    app: {
        head: {
            title: "KID Agency | Nuxt3 Boilerplate",
            htmlAttrs: { lang: "en" },
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "96x96",
                    href: "/favicon/favicon-96x96.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/favicon/favicon-16x16.png",
                },
            ],
            meta: [
                { charset: "utf-8" },
                { name: "description", content: "" },
                { name: "keywords", content: "" },
                { name: "format-detection", content: "telephone=no" },
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1.0, user-scalable=no",
                },
                { "http-equiv": "cache-control", content: "max-age=0" },
                { "http-equiv": "cache-control", content: "no-cache" },
                { "http-equiv": "expires", content: "0" },
                {
                    "http-equiv": "expires",
                    content: "Tue, 01 Jan 1980 1:00:00 GMT",
                },
                { "http-equiv": "pragma", content: "no-cache" },
                { name: "og:title", content: "" },
                { name: "og:description", content: "" },
                { name: "og:image", content: "/og/default.jpg" },
                { name: "og:url", content: "" },
                { name: "twitter:title", content: "" },
                { name: "twitter:description", content: "" },
                { name: "twitter:image", content: "" },
                { name: "twitter:card", content: "" },
            ],
        },
    },
    imports: {
        dirs: ["composables/**"],
    },
    vite: {
        plugins: [svgLoader()],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "@/assets/scss/mixin/main.scss" as *; @use "@/assets/scss/app/_vars.scss" as *;',
                },
            },
        },
    },
    build: {
        transpile: ["gsap"],
    },
    runtimeConfig: {
        public: {
            gtmContainerId: "", // set NUXT_PUBLIC_GTM_CONTAINER_ID in .env file
        },
    },
});
