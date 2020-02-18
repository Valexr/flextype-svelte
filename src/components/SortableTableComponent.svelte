<script>
import SortableTable from './SortableTable.svelte';
import Component from './ComponentTable.svelte';

let list = [
	{id: 1, name: 'First <TR>'},
	{id: 2, name: 'Second <TR>'},
	{id: 3, name: 'Third <TR>'}
];
const sortList = ev => {list = ev.detail};
</script>

<SortableTable 
    {list} 
    key="id" 
    on:sort={sortList}
    let:item
	let:index
>
    <Component {item} {index}/>
</SortableTable>