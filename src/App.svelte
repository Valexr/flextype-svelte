<script>
	import Tailwindcss from './Tailwindcss.svelte';

	let name = 'Flextype Svelte';
</script>

<style type="text/scss">
	h1 { @apply bg-black text-white leading-loose text-center;
		span {
			font-weight: 700; 
			@apply uppercase; 
			color: theme('colors.red.600');
		}
	}
</style>

<Tailwindcss />
<h1>Hello <span>{name}</span><strong class="text-yellow-500">!</strong></h1>
