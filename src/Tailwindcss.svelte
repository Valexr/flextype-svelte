<style global type="text/scss">
	@tailwind base;
	
	body {padding: 0; font-family: GoogleSans; @apply text-base text-gray-800}
	h1 {
	  @apply text-2xl;
	}
	h2 {
	  @apply text-xl;
	}
	h3 {
	  @apply text-lg;
	}
	a {	@apply text-gray-800;
        &:hover {
            @apply text-gray-500;
        }
    }

	@tailwind components;
	@tailwind utilities;
</style>
