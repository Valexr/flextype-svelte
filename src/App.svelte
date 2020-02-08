<script>
	import Tailwindcss from './Tailwindcss.svelte';

	let name = 'Flextype';
</script>

<style type="text/scss">
	h1 {
		span {color: red; font-weight: 900; @apply uppercase;
		}
		@apply bg-black text-white leading-loose text-center;
	}
	
</style>

<Tailwindcss />
<h1>Hello <span>{name}</span>!</h1>
