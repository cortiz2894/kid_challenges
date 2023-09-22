export const useMinDelay = async (_delay = 1000) => {
    const promise = new Promise(function (resolve) {
        setTimeout(() => {
            resolve();
        }, _delay);
    });

    await Promise.all([promise]);
    useDispatchEvent("minDelayCompleted", { delay: _delay });
};
