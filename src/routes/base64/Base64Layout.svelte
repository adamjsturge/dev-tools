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
		navigator.clipboard.writeText(outputValue).then(() => {
		});
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<h1 class="mb-4 text-2xl font-bold">{title}</h1>
	<input
		type="text"
		bind:value={inputValue}
		placeholder={inputPlaceholder}
        class="fixed-size mb-4 w-full max-w-md rounded border border-gray-300 p-2 text-left h-auto overflow-auto"
	/>
	<button on:click={handleClick} class="rounded bg-blue-500 p-2 text-white hover:bg-blue-700">
		{buttonText}
	</button>

	<div class="fixed-size mt-4 w-full max-w-md rounded border border-gray-300 p-2">
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
