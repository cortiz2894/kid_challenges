import imagesLoaded from "imagesloaded";

export const useImageLoader = async (_selector = "img") => {
    const promise = new Promise((resolve) => {
        const loader = imagesLoaded(
            document.querySelectorAll(_selector),
            { background: true },
            resolve
        );

        let count = 0;
        loader.on("progress", function (instance, image) {
            count++;
            let progress = Math.ceil((count * 100) / loader.images.length);
            useDispatchEvent("onImagesLoading", { progress: progress });
        });

        loader.on("fail", function (instance) {
            useDispatchEvent("onImagesLoadingFail");
        });
    });

    await Promise.all([promise]);
    useDispatchEvent("imagesLoaded");
};
