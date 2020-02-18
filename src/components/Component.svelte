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

<h3>
	<span>{index+1}</span> {item.name}
</h3>