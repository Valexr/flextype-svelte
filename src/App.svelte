<script>
	import Tailwindcss from './Tailwindcss.svelte';

	export let name;
</script>

<style type="text/scss">
	h1 {
		span {color: red; font-weight: 900;}
		@apply bg-black text-white leading-loose text-center text-2xl;
	}
	
</style>

<Tailwindcss />
<h1 class="">Hello <span>{name}</span>!</h1>
