<script>
	import {Link} from "svelte-routing";
	let customClass = "";
	export { customClass as class };
	import Icon from 'svelte-awesome';
  	import { faListAlt, faFileCode } from '@fortawesome/free-regular-svg-icons';
  	import { faDatabase, faPalette, faPlug, faToolbox, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
  	// FLEXTYPE-ICO-SVG -----------------------------------------------------
	export let flextype = {
		flextype: {
			width: 180,
			height: 180,
			raw: '<circle cx="90" cy="90" r="90" style="fill:black;"/><path d="M65.463,46.035L54.132,136.565L88.557,136.537L93.108,102.223L114.39,102.4L117.383,81.019L95.468,80.851L96.626,71.661L124.72,71.615L128.019,45.759L65.463,46.035Z" style="fill:white;"/>'
		}
	}

	let navItems = [
		{id: 0, href: '/', class: 'nav-logo', name: 'Flextype', icon: flextype, scale: 3},
		{id: 1, href: '/entries', class: '', name: 'Entries', icon: faDatabase},
		{id: 2, href: '/fieldsets', class: '', name: 'Fieldsets', icon: faListAlt},
		{id: 3, href: '/themes', class: '', name: 'Themes', icon: faPalette},
		{id: 4, href: '/snippets', class: '', name: 'Snippets', icon: faFileCode},
		{id: 5, href: '/plugins', class: '', name: 'Plugins', icon: faPlug},
		{id: 6, href: '/tools', class: '', name: 'Tools', icon: faToolbox},
		{id: 7, href: '/settings', class: '', name: 'Settings', icon: faCog},
		{id: 8, href: '/user ', class: 'nav-user', name: 'User', icon: faUserCircle},
		];
</script>

<nav class="nav {customClass}">
	<ul>
		{#each navItems as navItem, i}
			<li class="nav-item { navItem.class }" data-tooltip="{ navItem.name }">
				<Link to="{ navItem.href }">
			  		<Icon data={ navItem.icon } scale={ navItem.scale }/>
			  	</Link>
			</li>
	  	{/each}
	</ul>
</nav>

<style type="text/scss">
	.nav { @apply bg-gray-900;
	 // flex flex-col w-12 h-full items-center content-center inset-x-0 bottom-0;
		.nav-item {
			overflow: hidden;
			@apply relative cursor-pointer w-12 h-12 p-3 flex justify-center items-center no-underline;
			&:visited {}
			&:after {
				content: attr(data-tooltip);
				left: 100%;
				transform: translate(-.2rem,0%);
			    transition: opacity .2s,transform .2s;
			    // transition-delay: 0.15s;
				@apply absolute opacity-0 w-auto py-2 px-4 text-gray-100 bg-gray-800 text-sm rounded-sm shadow-xl;
			}
			&:hover, &:focus {
				overflow: visible;
				@apply text-white;
				&:after {
					opacity: 1;
					transform: translate(.2rem,0%);
					@apply flex; 
				}
			}
			&.active { @apply bg-gray-800 text-white; }
			&[aria-current] { @apply bg-gray-800 text-white; }
			&.nav-logo { @apply p-2; }
			&.nav-user { @apply absolute inset-x-0 bottom-0; }
		}
	}
</style>