<script>
	let text = 'Fieldsets';

	import { onMount } from 'svelte';

	const apiURL = "https://jsonplaceholder.typicode.com/todos";
    let datas = [];
    onMount(async () => {
        const response = await fetch(apiURL);
        datas = await response.json();
    });
</script>

<h1>{text}</h1>

<div class="p-4">
	{#if datas}
		{#each datas as item }
            <div>
            	<b>{item.id}</b>
            	<h2>{item.userId}</h2>
                <h3>{item.title}</h3>
                <p>{item.completed}</p>
                <hr>
            </div>
        {/each}
    {:else}
		<p>LOADING.....</p>
	{/if}
</div>

<style type="text/scss">
	h1 {@apply text-gray-600;}
</style>