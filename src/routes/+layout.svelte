<script>
	import '../app.css';
	const variants = {
		'latte': 'latte',
		'cappuccino': 'cappuccino',
		'macchiato': 'macchiato',
		'mocha': 'mocha',
	}
	let selected = 'macchiato';
</script>

<svelte:head>
	<title>Dev Tools</title>
</svelte:head>
<nav class="flex items-center justify-between bg-ctp-crust p-4 text-ctp-text">
	<a href="/" class="font-bold">Home</a>
	<!-- <a href="/qr-code" class="font-bold">QR Code</a> -->
	<!-- <div class="flex max-w-fit border rounded border-ctp-overlay0 ml-auto">
		<select
			bind:value={selected}
			class="
				focus:rounded-r 
				focus:ring-pink 
				focus:border-ctp-pink 
				bg-ctp-overlay0 
				w-full 
				p-1 
				text-ctp-text
			"
			name="colorscheme"
		>
			{#each Object.keys(variants) as variant}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	</div> -->
	
</nav>

<slot></slot>
