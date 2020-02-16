<script>
  import Icon from 'svelte-awesome';
  // import { faListAlt, faFileCode } from '@fortawesome/free-regular-svg-icons';
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
    {id: 0, class: '', name: 'Scott Jy', icon: faUser, href: '/admin/entries/edit?id=team-members/scott-jy&amp;type=editor'},
    {id: 1, class: '', name: 'Jon Doe', icon: faUser, href: '/admin/entries/add?id=team-members/scott-jy'},
    {id: 2, class: '', name: 'Dan Abrams', icon: faUser, href: 'javascript:;'},
    {id: 3, class: '', name: 'Mike Li', icon: faUser, href: '/admin/entries/rename?id=team-members/scott-jy'},
    ];
</script>

<table class="table table-auto no-margin w-full overflow-auto">
    <tbody>
      {#each tableItems as tableItem, i}
        <tr class="border h-12 px-4 py-2 hover:bg-gray-300">
            <td class="text-center">
              <Icon data={ tableItem.icon } class="align-text-top" scale="1" />
            </td>
            <td class="px-4">
              <a href="{ tableItem.href }">{ tableItem.name }</a>
            </td>
            <td class="px-4 text-right">
              {#each dropdownMenuItems as dropdownMenuItem, i}
                <a class="dropdown-item" href="{ dropdownMenuItem.href }" onClick="" target="{ dropdownMenuItem.target }" data-tooltip="{ dropdownMenuItem.name }">
                  <Icon data={ dropdownMenuItem.icon } class="" scale="1" /><!-- { dropdownMenuItem.name } -->
                </a>
              {/each}
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