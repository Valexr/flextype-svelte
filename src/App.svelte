<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import {
		Nav,
		Header,
		Table,
		FlextypeSvg,
		Html5
	} from './components';

	import { onMount } from "svelte";

    let entries;
		onMount(async()=>{
			const response = await fetch("https://docs.flextype.org/en/content/entries?format=json")
			const todo = await response.json();
			entries = todo
		});
</script>

<Tailwindcss />

<div class="base">
	<Nav class="" />

	<div class="content">
		<Header class="" />

		<main class="main">
			<Table />
			<!-- <FlextypeSvg size="180" /> -->
			<!-- <Html5 /> -->
			<!-- <svg class="svg-ico">
				<use xlink:href="feather-sprite.svg#activity" />
			</svg> -->
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
				<p>loading.....</p>
			{/if}
		</main>
	</div>
</div>

<style type="text/scss">
	.base {
		@apply flex h-full w-full;
		.content {
			@apply flex flex-col h-full w-full;
			.main {
				@apply w-full h-full bg-gray-100 p-6;
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