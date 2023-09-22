import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export function useFBXModel() {
    const fbxLoader = new FBXLoader();

    function load(url: string) {
        return new Promise((resolve, reject) => {
            fbxLoader.load(url, resolve, undefined, reject);
        });
    }

    return {
        load,
    };
}
