<script>
	import Tailwindcss from '../Tailwindcss.svelte';
	import { Nav, Header, AdressBar } from '../Layout';
</script>
<Tailwindcss />

<div class="base">
	<Nav />

	<div class="content">
		<Header />
		<AdressBar />

		<main class="main">
			<slot />
		</main>
	</div>
</div>

<style type="text/scss">
	.base {
		@apply flex h-full w-full;
		.content {width: calc(100% - 3rem);
			@apply flex flex-col h-full;
			.main {
				@apply w-full h-full bg-white p-6 overflow-y-auto;
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