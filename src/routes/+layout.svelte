<script>
	// import { onMount } from 'svelte';
    import '../app.css';

    // const variants = {
    //     'latte': 'latte',
    //     'cappuccino': 'cappuccino',
    //     'macchiato': 'macchiato',
    //     'mocha': 'mocha',
    // }
    // let selected = 'macchiato';

    // onMount(() => {
    //     if (typeof document !== 'undefined') {
    //         document.body.classList.add(`ctp-${selected}`);
    //     }
    // });

    // $: {
    //     if (typeof document !== 'undefined') {
    //         document.body.className = `ctp-${selected}`;
    //     }
    // }
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
	<div class="flex max-w-fit rounded ml-auto">
        <a href="https://github.com/adamjsturge/dev-tools" target="_blank" rel="noopener noreferrer" class="ml-4">
            <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
        </a>
    </div>
	
</nav>

<slot></slot>
