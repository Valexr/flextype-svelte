<script>
	import Tailwindcss from './Tailwindcss.svelte';

	export let name;
</script>

<style>
	h1 {
		/*@apply bg-black text-white;*/
	}
	
</style>

<Tailwindcss />
<h1 class="bg-black text-white">Hello {name}!</h1>
