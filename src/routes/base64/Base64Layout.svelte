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

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<h1 class="mb-4 text-2xl font-bold">{title}</h1>
	<textarea
		bind:value={inputValue}
		placeholder={inputPlaceholder}
		class="mb-4 h-72 w-[600px] max-w-md overflow-auto rounded border border-gray-300 p-2 text-left"
	/>
	<button on:click={handleClick} class="rounded bg-blue-500 p-2 text-white hover:bg-blue-700">
		{buttonText}
	</button>

	<div class="mt-4 h-72 w-[600px] max-w-md rounded border border-gray-300 p-2">
		<p class="break-words">{outputValue}</p>
	</div>
	<button
		on:click={copyToClipboard}
		class="mt-2 rounded bg-green-500 p-2 text-white hover:bg-green-700"
	>
		Copy Output
	</button>
</div>

<style>
	.fixed-size {
		width: 600px;
		height: 250px;
	}
</style>
