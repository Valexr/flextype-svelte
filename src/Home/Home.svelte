<script>
  let text = 'Home';
  import { onMount } from 'svelte';

  let entries = {};
	onMount(async () => {
		const response = await fetch('https://flextype.in-sign.ru/api/delivery/entries?id=home&token=27ee51ee1c8a35e41718a3a63f74b501');
		const todo = await response.json();
		entries = todo;
	});
	// let json = JSON.parse(entries);
</script>

<h1>{text}</h1>
<div class="p-6 bg-gray-200">
	<h1 class="text-left font-bold py-3">Fetch from flextype.in-sign.ru?delivery&token</h1>
	{#if entries}
	<h2>HTML</h2>
		<p class="py-3">title: {entries.title}</p>
		<a class="block py-3" href="{entries.menu_item_url}" alt="{entries.menu_item_url}">menu_item_url: {entries.menu_item_url}</a>
		<div class="py-3">
			entries.content: {@html entries.content}
		</div>
		<!-- <img src="https://flextype.in-sign.ru/api/delivery/images/home/face.jpg?filt=sepia&token=8de813306852b56313e3a1c43f894650"> -->
		<div class="text-left break-all py-3">
			<h2>JSON</h2>
			<pre>{ JSON.stringify(entries, undefined, 2) } </pre>
			<!-- { JSON.parse(entries) } -->
			<!-- content: {entries.content}
		    created_at: {entries.created_at}
		    {entries.created_by}
		    {entries.description}
		    {entries.fieldset}
		    {entries.menu_item_order}
		    {entries.menu_item_target}
		    {entries.menu_item_title}
		    {entries.menu_item_url}
		    {entries.modified_at}
		    {entries.published_at}
		    {entries.published_by}
		    {entries.routable}
		    {entries.slug}
		    {entries.template}
		    {entries.title}
		    {entries.uuid}
		    {entries.visibility} -->
		</div>
	{:else}
		<p class="text-red-700">loading.....</p>
	{/if}
</div>

<style type="text/scss">
	h1 {@apply text-gray-600;}
</style>