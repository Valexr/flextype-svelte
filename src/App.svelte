<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import {
		Nav,
		Header,
		Table,
		AdressBar,
		FlextypeSvg,
		Html5
	} from './components';

	import { onMount } from 'svelte';

	let entries;
	onMount(async () => {
		const response = await fetch('https://flextype.in-sign.ru?format=json');
		const todo = await response.json();
		entries = todo;
	});

	let myTodo = getTodo();
	async function getTodo() {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		const todo = await response.json();

		if (response.ok) {
			return todo;
		} else {
			throw new Error(todo);
		}
	}

    const apiURL = "https://jsonplaceholder.typicode.com/todos";
    let datas = [];
    onMount(async () => {
        const response = await fetch(apiURL);
        datas = await response.json();
    });

    import TableSort from './components/TableSort.svelte'
	let data = [];
	const dataPromise = fetch(`https://node-hnapi.herokuapp.com/news?page=1`)
	.then(r => r.json())
	.then(items => {
		data = items;
	});

	import SortableListComponent from './components/SortableListComponent.svelte';
	import SortableTableComponent from './components/SortableTableComponent.svelte';
	import SvelteTable from './components/SvelteTable/SvelteTable.svelte';

</script>

<Tailwindcss />

<div class="base">
	<Nav class="" />

	<div class="content">
		<Header class="" />
		<AdressBar />

		<main class="main">

			<div class="p-4 bg-gray-200">
				<h2 class="text-center py-3">Fetch from flextype.in-sign.ru?format=json</h2>
				{#if entries}
					<p class="text-center py-3">title: {entries.title}</p>
					<a class="text-center block py-3" href="{entries.menu_item_url}" alt="{entries.menu_item_url}">menu_item_url: {entries.menu_item_url}</a>
					<div class="text-center py-3">entries.content: {@html entries.content}</div>
					<!-- <ul>
						{#each entries as entry, i}
							<li>

							</li>
						{/each}
					</ul> -->
				{:else}
					<p class="text-red-700">loading.....</p>
				{/if}
			</div>
			
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

			<div class="overflow-auto md:p-4">
				<h2>Sortable Table</h2>
				<SortableTableComponent />
			</div>

			<div class="overflow-auto md:p-4">
				<h2>Sortable List</h2>
				<SortableListComponent />
			</div>

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

			<div class="overflow-auto md:p-4">
				<Table />
			</div>
			<!-- <FlextypeSvg size="180" /> -->
			<!-- <Html5 /> -->
			<!-- <svg class="svg-ico">
				<use xlink:href="feather-sprite.svg#activity" />
			</svg> -->

			<div class="p-4">
				{#await myTodo}
				    <p>...waiting</p>
				{:then todo_1}
				    <p>{todo_1.title}</p>
				{:catch error}
				    <p style="color: red">{error.message}</p>
				{/await}
			</div>

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
		</main>
	</div>
</div>

<style type="text/scss">
	.base {
		@apply flex h-full w-full;
		.content {width: calc(100% - 3rem);
			@apply flex flex-col h-full;
			.main {
				@apply w-full h-full bg-gray-100 p-6 overflow-y-auto;
			}
		}
	}
	:global(.svg-ico) {
		width: 16px;
        height: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
	}
</style>