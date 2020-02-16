import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

import copy from 'rollup-plugin-copy';
// import inlineSvg from 'rollup-plugin-inline-svg';

// import svgicons from 'rollup-plugin-svg-icons';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [

		copy({
		  targets: [{ src: 'public/*', dest: 'docs' }],
		  hook: 'writeBundle'
		}),

		// inlineSvg({
	 //      // Removes specified tags and its children. You can specify tags by setting removingTags query array.
	 //      // default: false
	 //      removeTags: true,
	  
	 //      // warning: this won't work unless you specify removeTags: true
	 //      // default: ['title', 'desc', 'defs', 'style']
	 //      removingTags: ['title', 'desc', 'defs', 'style'],
	     
	 //      // warns about present tags, ex: ['desc', 'defs', 'style']
	 //      // default: []
	 //      warnTags: [], 
	 
	 //      // Removes `width` and `height` attributes from <svg>.
	 //      // default: true
	 //      removeSVGTagAttrs: true,
	  
	 //      // Removes attributes from inside the <svg>.
	 //      // default: []
	 //      removingTagAttrs: [],
	  
	 //      // Warns to console about attributes from inside the <svg>.
	 //      // default: []
	 //      warnTagAttrs: []
	 //    }),

	    // svgicons({
	    //   // folder with svg-icons
	    //   inputFolder: 'src/feather-icons',  // it is default value
	 
	    //   // path for the sprite file
	    //   output: 'public/bundle.svg', // it is default value
	 
	    //   // Also you can use any Svgstore options: 
	    //   // https://github.com/svgstore/svgstore#svgstore-options
	    //   //
	    //   // cleanDefs
	    //   // cleanSymbols
	    //   // svgAttrs: true,
	    //   // symbolAttrs: true,
	    //   // copyAttrs: true,
	    //   // renameDefs
	    //   // inline: true
	 
	    // }),

		svelte({
			preprocess: sveltePreprocess({ postcss: true }),
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			// preprocess: autoPreprocess()
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// In dev mode, call `npm run start:dev` once
		// the bundle has been generated
		// !production && rollup_start_dev,
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()

	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}