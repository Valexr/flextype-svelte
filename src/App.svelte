<script>
	import {Router, Route} from "svelte-routing";
	import Home from './Home/Home.svelte';
	import Entries from './Entries/Entries.svelte';
	import Fieldsets from './Fieldsets/Fieldsets.svelte';
	import Themes from './Themes/Themes.svelte';
	import Snippets from './Snippets/Snippets.svelte';
	import Plugins from './Plugins/Plugins.svelte';
	import Tools from './Tools/Tools.svelte';
	import Settings from './Settings/Settings.svelte';
	import User from './User/User.svelte';

	import Page404 from './Page404/Page404.svelte';

	export let url = "";

	import { Layout } from './Layout';
</script>


<Router url="{url}">
  <Layout>
    <Route path="/" component={Home}/>
    <Route path="entries" component={Entries}/>
    <Route path="fieldsets" component={Fieldsets}/>
    <Route path="themes" component={Themes}/>
    <Route path="snippets" component={Snippets}/>
    <Route path="plugins" component={Plugins}/>
    <Route path="tools" component={Tools}/>
    <Route path="settings" component={Settings}/>
    <Route path="user" component={User}/>
    <!-- <Route path="/news/:id" component={NewsDetails}/> -->
    <Route component={Page404}/>
  </Layout>
</Router>


<style type="text/scss">
	
</style>