<script>
	let text = 'Plugins';


	import SvelteTable from '../components/SvelteTable/SvelteTable.svelte';
	let data = [];
	const dataPromise = fetch(`https://node-hnapi.herokuapp.com/news?page=1`)
	.then(r => r.json())
	.then(items => {
		data = items;
	});
</script>

<h1>{text}</h1>

<div class="overflow-auto md:p-4">
	<h2>Svelte Table</h2>
	
	{#await dataPromise}
		Loading...
	{:then}
		<SvelteTable {data} />
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style type="text/scss">
	div {@apply text-gray-600;}
</style>