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
		<ul class="header-tabs">
			{#each headerTabs as headerTab, i}
				<li>
					<a class="{ headerTab.class }" href="{ headerTab.href }">{ headerTab.name }</a>
				</li>
		  	{/each}
		</ul>
	</slot>
</header>

<style type="text/scss">
	.header { @apply flex content-center justify-start w-full h-12 bg-gray-800 text-white;
		.header-tabs { @apply flex justify-around w-full items-center content-center;
			li { @apply flex-1;
				a { @apply text-white cursor-pointer justify-center flex px-4 py-3;
					&:hover { @apply bg-gray-700;}
					&.active { @apply bg-gray-200 text-gray-900; }
					&.disable { @apply text-gray-600 cursor-not-allowed; }
				}
			}
		}
	}
</style>