<script>
	import '../app.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	// export const prerender = true
</script>

<nav class="flex items-center justify-between bg-ctp-crust p-4 text-ctp-text">
	<a href="/" class="font-bold">Home</a>
	<!-- <a href="/qr-code" class="font-bold">QR Code</a> -->
</nav>

{@render children?.()}
