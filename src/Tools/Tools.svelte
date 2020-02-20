<script>
  let text = 'Tools';

  import Table from '../components/Table.svelte';
</script>

<h1>{text}</h1>

<div class="overflow-auto md:p-4">
	<Table />
</div>

<style type="text/scss">
  h1 {
    @apply text-gray-600;
  }
</style>