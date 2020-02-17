<script>
	let customClass = "";
	export { customClass as class };
	let headerTabs = [
		{id: 0, name: 'Entries', class: 'active' },
		{id: 1, name: 'Editor', class: '' },
		{id: 2, name: 'Media', class: '' },
		{id: 3, name: 'Source', class: 'disable'},
		]
</script>

<header class="header {customClass}">
	<slot>
		<nav class="header-tabs">
			{#each headerTabs as headerTab, i}
				<a class="{ headerTab.class }" href="{ headerTab.href }">{ headerTab.name }</a>
		  	{/each}
		</nav>
	</slot>
</header>

<style type="text/scss">
	.header { @apply bg-gray-800;
		.header-tabs { @apply flex;
			a { @apply flex flex-1 items-center justify-center h-12 text-white cursor-pointer;
				&:hover { @apply bg-gray-700;}
				&.active { @apply bg-gray-100 text-gray-900; }
				&.disable { @apply text-gray-600 cursor-not-allowed; }
			}
		}
	}
</style>