<script>
	import Tailwindcss from './Tailwindcss.svelte';
	import { 
		Header, 
		// Nav, 
		FlextypeSvg, 
		Html5, 
		Table
	}  from './components';	
	import Icon from 'svelte-awesome';
	import Nav from "./components/Nav.svelte";
</script>

<Tailwindcss />

<div class="base">
	<Nav class="" />

	<div class="content">
		<Header class="" />

		<main class="main">
			<Table />

			<Icon />

			<FlextypeSvg size="180" />
			<Html5 />
		    <svg 
		    	class="svg-ico"
		    	width="24"
				height="24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
			    <use xlink:href="feather-sprite.svg#activity" />
		  	</svg>
		</main>
	</div>
</div>

<style type="text/scss">
	.base { @apply flex h-full w-full;
		.content { @apply flex flex-col h-full w-full;
			.main { @apply w-full h-full bg-gray-100 p-6;}
		}
	}
	.svg-ico{
		display: inline-block;
		color: currentColor;
		width: 24px;
		height: 24px;
		vertical-align: middle;
	}
	// :global(.feather) {
	//   /*width: 24px;*/
	//   /*height: 24px;*/
	//   stroke: currentColor;
	//   stroke-width: 2;
	//   stroke-linecap: round;
	//   stroke-linejoin: round;
	//   fill: none;
	// }
</style>