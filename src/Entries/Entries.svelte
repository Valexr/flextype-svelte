<script>
	let text = 'Entries';

    import TableSort from '../components/TableSort.svelte'
	let data = [];
	const dataPromise = fetch(`https://node-hnapi.herokuapp.com/news?page=1`)
	.then(r => r.json())
	.then(items => {
		data = items;
	});

</script>

<h1>{text}</h1>

<div class="overflow-auto md:p-4">
	<h1>Hacker News</h1>

	{#await dataPromise}
		<p>Loading...</p>
	{:then}
	<TableSort items={data} class="table table-auto no-margin w-full overflow-auto">
		<tr slot="thead">
			<th data-sort="id">Id</th>
			<th data-sort="title">Title</th>
			<th data-sort="user">User</th>
			<th data-sort="domain">Domain</th>
			<th data-sort="time" data-sort-initial="descending">Time ago</th>
			<th data-sort="comments_count">Comments</th>
		</tr>
		<tr class="entry border h-12 px-4 py-2" slot="tbody" let:item={item}>
			<td class="px-4">{item.id}</td>
			<td class="px-4"><a href="{item.url}">{item.title}</a></td>
			<td>{item.user}</td>
			<td>{item.domain}</td>
			<td>{item.time_ago}</td>
			<td>{item.comments_count}</td>
		</tr>
	</TableSort>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style type="text/scss">
	h1 {@apply text-gray-600;}
</style>