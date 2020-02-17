<script>
    import Icon from 'svelte-awesome';
    import { faUser, faEllipsisH, faEdit, faPlusCircle, faCopy, faFont, faAngleDoubleRight, faEye, faListAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

    let dropdownMenuItems = [
        {id: 0, class: '', name: 'Edit', icon: faEdit, href: '/admin/entries/edit?id=team-members/scott-jy&amp;type=editor'},
        {id: 1, class: '', name: 'Add', icon: faPlusCircle, href: '/admin/entries/add?id=team-members/scott-jy'},
        {id: 2, class: '', name: 'Duplicate', icon: faCopy, href: 'javascript:;'},
        {id: 3, class: '', name: 'Rename', icon: faFont, href: '/admin/entries/rename?id=team-members/scott-jy'},
        {id: 4, class: '', name: 'Move', icon: faAngleDoubleRight, href: '/admin/entries/move?id=team-members/scott-jy'},
        {id: 5, class: '', name: 'Preview', icon: faEye, href: 'http://flextype.local.web/team-members/scott-jy', target: '_blank'},
        {id: 6, class: '', name: 'Type', icon: faListAlt, href: '/admin/entries/type?id=team-members/scott-jy'},
        {id: 7, class: '', name: 'Delete', icon: faTrashAlt, href: 'javascript:;'},
    ];

    let tableItems = [
        {id: 0, class: '', name: 'Scott Jy', created: '12.12.2121', icon: faUser, href: '/admin/entries/edit?id=team-members/scott-jy&amp;type=editor'},
        {id: 1, class: '', name: 'Jon Doe', created: '12.12.2121', icon: faUser, href: '/admin/entries/add?id=team-members/scott-jy'},
        {id: 2, class: '', name: 'Dan Abrams', created: '12.12.2121', icon: faUser, href: 'javascript:;'},
        {id: 3, class: '', name: 'Mike Li', created: '12.12.2121', icon: faUser, href: '/admin/entries/rename?id=team-members/scott-jy'},
    ];
</script>

<table class="table table-auto no-margin w-full overflow-auto">
    <thead>
        <tr>
            <th class="px-4 py-2 text-gray-800">Icon</th>
            <th class="px-4 py-2 text-gray-800 text-left">Name</th>
            <th class="px-4 py-2 text-gray-800">Created</th>
            <th class="px-4 py-2 text-gray-800">Updated</th>
            <th class="px-4 py-2 text-gray-800">Menu</th>
        </tr>
    </thead>
    <tbody>
      {#each tableItems as tableItem, i}
        <tr class="entry">
            <td class="entry-icon">
                <Icon data={ tableItem.icon } class="align-text-top" scale="1" />
            </td>
            <td class="entry-name">
                <a href="{ tableItem.href }">{ tableItem.name }</a>
            </td>
            <td class="entry-created text-center">
                <a href="{ tableItem.href }">{ tableItem.created }</a>
            </td>
            <td class="entry-updated text-center">
                <a href="{ tableItem.href }">{ tableItem.updated }</a>
            </td>
            <td class="entry-menu">
                <nav class="dropdown">
                {#each dropdownMenuItems as dropdownMenuItem, i}
                    <a class="dropdown-item px-2 sm:px-0" href="{ dropdownMenuItem.href }" onClick="" target="{ dropdownMenuItem.target }" data-tooltip="{ dropdownMenuItem.name }">
                        <Icon data={ dropdownMenuItem.icon } class="" scale="1" /><!-- { dropdownMenuItem.name } -->
                    </a>
                {/each}
                </nav>
                <!-- <div class="btn-group">
                    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                      <Icon data={ faEllipsisH } class="" scale="1" />
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg-right">

                        <div class="dropdown-divider"></div>
                        <form id="duplicate-id-team-members/scott-jy" action="/admin/entries/duplicate" method="POST" style="display: none;" class="has-validation-callback">
                            <input type="hidden" name="csrf_name" value="csrf5e47f578d8ae0"><input type="hidden" name="csrf_value" value="6349a8d952044815715507e283fa09fb">
                            <input type="hidden" name="id" value="team-members/scott-jy">
                        </form>
                        <form id="delete-id-team-members/scott-jy" action="/admin/entries/delete" method="POST" style="display: none;" class="has-validation-callback">
                            <input type="hidden" name="csrf_name" value="csrf5e47f578d8ae0"><input type="hidden" name="csrf_value" value="6349a8d952044815715507e283fa09fb">
                            <input type="hidden" name="id" value="team-members/scott-jy">
                            <input type="hidden" name="id-current" value="team-members">
                        </form>
                        <a class="dropdown-item" href="" onclick="event.preventDefault(); document.getElementById('delete-id-team-members/scott-jy').submit();"><i class="fas fa-trash-alt" aria-hidden="true"></i> </a>
                    </div>
                </div> -->
            </td>
        </tr>
      {/each}
    </tbody>
</table>

<style type="text/scss">
    thead {@apply text-sm}
    .entry {@apply border h-12 px-4 py-2;
        &:hover {@apply bg-gray-200;
            .entry-menu {@apply opacity-100}
        }
    }
    .entry-icon {@apply text-center w-12}
    .entry-name {
        a {@apply whitespace-no-wrap;
            @apply text-gray-800 px-4;
            &:hover {
                @apply text-gray-500;
            }
        }
    }
    .entry-menu {@apply px-4 text-right w-64 opacity-0;
        .dropdown { @apply flex flex-row justify-between w-auto items-center content-center;
            .dropdown-item { @apply text-gray-500 relative overflow-hidden;
                &:after {
                    content: attr(data-tooltip);
                    left: -100%;
                    bottom: 100%;
                    transform: translate(0%, .2rem);
                    transition: opacity .2s,transform .2s;
                    // transition-delay: 0.15s;
                    @apply absolute opacity-0 w-auto py-1 px-2 text-gray-100 bg-gray-800 text-xs rounded-sm shadow-xl;
                }
                &:hover, &:focus {
                    @apply text-gray-800 overflow-visible;
                    &:after {
                        opacity: 1;
                        transform: translate(0%, -.2rem);
                        @apply flex; 
                    }
                }
            }
        }
    }
</style>