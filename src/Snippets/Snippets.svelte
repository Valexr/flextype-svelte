<script>
  	let text = 'Snippets';

  	import SortableTableComponent from '../components/SortableTableComponent.svelte';
	import SortableListComponent from '../components/SortableListComponent.svelte';
</script>

<h1>{text}</h1>

<div class="overflow-auto md:p-4">
	<h2>Sortable Table</h2>
	<SortableTableComponent />
</div>

<div class="overflow-auto md:p-4">
	<h2>Sortable List</h2>
	<SortableListComponent />
</div>

<style type="text/scss">
  h1 {
    @apply text-gray-600;
  }
</style>