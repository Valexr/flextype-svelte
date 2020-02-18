<script>
import SortableList from './SortableList.svelte';
import Component from './Component.svelte';

let list = [
	{id: 1, name: 'First Item'},
	{id: 2, name: 'Second Item'},
	{id: 3, name: 'Third Item'}
];
const sortList = ev => {list = ev.detail};
</script>

<SortableList 
    {list} 
    key="id" 
    on:sort={sortList}
    let:item
	let:index
>
    <Component {item} {index}/>
</SortableList>