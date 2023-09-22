import { gsap } from "gsap";
import { usePageTransition } from "../composables/usePageTransition";

const { toggleTransitionComplete } = usePageTransition();

const pageTransition = {
    name: "page-transiton",
    mode: "out-in",
    onEnter: (el, done) => {
        gsap.set(el, { autoAlpha: 0 });
        const tl = gsap.timeline({
            paused: true,
            onComplete() {
                gsap.set(el, { clearProps: "all" });
                toggleTransitionComplete(true);
                done();
            },
        });

        tl.to(el, { autoAlpha: 1, duration: 0.25 });
        tl.play();
    },
    onLeave: (el, done) => {
        toggleTransitionComplete(false);
        const tl = gsap.timeline({
            paused: true,
            onComplete: done,
        });
        tl.to(el, { autoAlpha: 0, duration: 0.25 });
        tl.play();
    },
};

export default pageTransition;
