<script>
  	let text = 'Themes';

  	import { onMount } from 'svelte';

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
</script>

<h1>{text}</h1>

<div class="p-4">
	{#await myTodo}
	    <p>...waiting</p>
	{:then todo_1}
	    <p>{todo_1.title}</p>
	{:catch error}
	    <p style="color: red">{error.message}</p>
	{/await}
</div>

<style type="text/scss">
  h1 {
    @apply text-gray-600;
  }
</style>