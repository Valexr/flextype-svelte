<script>
	import Tailwindcss from './Tailwindcss.svelte';

	let name = 'Flextype Svelte';
</script>

<style type="text/scss">
	h1 {
		span {font-weight: 700; @apply uppercase text-red-900;
		}
		@apply bg-black text-white leading-loose text-center;
	}
	
</style>

<Tailwindcss />
<h1>Hello <span>{name}</span>!</h1>
