// import { build } from "esbuild";

// build({
// 	entryPoints: ["index.js"],
// 	outfile: "index.38661719.js",
// 	bundle: true,
// 	// plugins: [glsl({
// 	// 	minify: true
// 	// })]
// }).catch(() => process.exit(1));


import { glsl } from "esbuild-plugin-glsl";
import esbuildServe from 'esbuild-serve';

esbuildServe(
    {
        entryPoints: ["index.js"],
        outfile: "index.38661719.js",
        bundle: true,
        plugins: [glsl({
            minify: true
        })]
    },
    {
        // serve options (optional)
        port: 7000,
        root: '.'
    }
);