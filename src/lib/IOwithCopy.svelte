<script>
	export let title = '';
	export let inputPlaceholder = '';
	export let buttonText = '';
	/**
	 * @type {(arg0: string) => string}
	 */
	export let onButtonClick;
	let inputValue = '';
	let outputValue = '';

	function handleClick() {
		outputValue = onButtonClick(inputValue);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(outputValue).then(() => {});
	}
</script>

<div class="flex flex-col items-center justify-center p-4">
	<h1 class="mb-2 text-2xl font-bold">{title}</h1>
	<textarea
		bind:value={inputValue}
		placeholder={inputPlaceholder}
		class="mb-2 h-72 w-[600px] max-w-md overflow-auto rounded border p-2 text-left"
	/>
	<button on:click={handleClick} class="rounded p-2">
		{buttonText}
	</button>

	<div class="mt-4 h-72 w-[600px] max-w-md rounded border border-ctp-text p-2">
		<p class="break-words">{outputValue}</p>
	</div>
	<button on:click={copyToClipboard} class="mt-2 rounded p-2"> Copy Output </button>
</div>
