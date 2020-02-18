<script>
	export let item;
	export let index;
</script>

<style>
	span{
		background-color: #ddd;
		border-radius: 4px;
		padding: 0 1em;
		font-size: .5em;
	}
</style>

<td class="px-4 py-2">{index+1}</td>
<td class="px-4 py-2">{item.name}</td>