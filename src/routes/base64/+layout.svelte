<script>
	import { page } from '$app/stores';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<nav class="bg-gray-800 p-4">
	{#if $page.url.pathname === '/base64/encode'}
		<a href="/base64/decode" class="text-white hover:text-gray-400">Go to Decode</a>
	{:else if $page.url.pathname === '/base64/decode'}
		<a href="/base64/encode" class="text-white hover:text-gray-400">Go to Encode</a>
	{/if}
</nav>

{@render children?.()}
