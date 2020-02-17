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
		const response = await fetch('https://in-sign.ru/flextype-api.php');
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
    let data = [];
    onMount(async () => {
        const response = await fetch(apiURL);
        data = await response.json();
    });

</script>

<Tailwindcss />

<div class="base">
	<Nav class="" />

	<div class="content">
		<Header class="" />
		<AdressBar />

		<main class="main">
			<div class="overflow-auto md:p-4">
				<Table />
			</div>
			<!-- <FlextypeSvg size="180" /> -->
			<!-- <Html5 /> -->
			<!-- <svg class="svg-ico">
				<use xlink:href="feather-sprite.svg#activity" />
			</svg> -->
			<div class="p-4">
				{#if entries}
					<ul>
						{#each entries as entry, i}
							<li>
								<h2>entry.on_this_page.title</h2>
								<a href="entry.on_this_page.title" alt="entry.on_this_page.title">entry.on_this_page.link</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-red-700">loading.....</p>
				{/if}
			</div>

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
				{#if data}
					{#each data as item }
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