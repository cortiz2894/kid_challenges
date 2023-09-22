export default defineNuxtPlugin((nuxtApp) => {
    /**
     *  Event fired on page start loading.
     **/
    nuxtApp.hook("page:start", () => {
        useDispatchEvent("onPageStart");
    });

    /**
     *  Event fired on page finish loading.
     **/
    nuxtApp.hook("page:finish", () => {
        useDispatchEvent("onPageFinish");
    });

    /**
     *  Event fired on page finish loading.
     **/
    nuxtApp.hook("page:transition:finish", () => {
        useDispatchEvent("onPageTransitionFinish");
    });
});
