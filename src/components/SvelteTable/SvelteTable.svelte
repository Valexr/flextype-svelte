<script>
import STable from './STable.svelte'
import STh from './STh.svelte'
import STr from './STr.svelte'
import SPagination from './SPagination.svelte'

export let data = []

let filters = {
  id: {value: '', keys: ['id']},
  title: {value: '', keys: ['title']},
  user: {value: '', keys: ['user']},
  domain: {value: '', keys: ['domain']},
  time_ago: {value: '', keys: ['time_ago']},
  comments_count: {value: '', keys: ['comments_count']}
}

let pageSize = 10
let totalPages = 0
let currentPage = 1
let allowSelection = true

function totalPagesChanged (e) {
  totalPages = e.detail
}
</script>

<style>
 
</style>

<input placeholder="by title" bind:value="{filters.title.value}"/>

<STable {data} {filters} {pageSize} {currentPage} {allowSelection}
        class="table table-auto w-full"
        selectedClass="table-info"
        on:totalPagesChanged="{totalPagesChanged}"
>
    <thead slot="head">
        <STh sortKey="id" defaultSort="asc">Id</STh>
        <STh sortKey="title" defaultSort="asc">Title</STh>
        <STh sortKey="user" defaultSort="asc">User</STh>
        <STh sortKey="domain" defaultSort="asc">Domain</STh>
        <STh sortKey="time_ago" defaultSort="asc">Time ago</STh>
        <STh sortKey="comments_count" defaultSort="asc">Comments</STh>
    </thead>
    <tbody slot="body" let:displayData="{displayData}">
        {#each displayData as row, i}
            <STr {row} class="border">
                <td class="px-4 py-2">{row.id}</td>
                <td class="px-4 py-2"><a href="{row.url}">{row.title}</a></td>
                <td class="px-4 py-2">{row.user}</td>
                <td class="px-4 py-2">{row.domain}</td>
                <td class="px-4 py-2">{row.time_ago}</td>
                <td class="px-4 py-2">{row.comments_count}</td>
            </STr>
        {/each}
    </tbody>
</STable>

<SPagination {totalPages} bind:currentPage="{currentPage}"/>
