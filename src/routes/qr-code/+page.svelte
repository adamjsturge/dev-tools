<svelte:head>
    <title>QR Code Generator - Dev Tools</title>
</svelte:head>

<script>
	import QRCode from 'qrcode';

	let url = $state('');
	let qrCodeDataUrl = $state('');

	const generateQRCode = async () => {
		try {
			const rendererOpts = {
				quality: 1
			};
			qrCodeDataUrl = await QRCode.toDataURL(url, { rendererOpts });
		} catch (err) {
			console.error(err);
		}
	};

	const saveQRCode = () => {
		const link = document.createElement('a');
		link.href = qrCodeDataUrl;
		link.download = 'qrcode.png';
		link.click();
	};
</script>

<main class="flex h-screen flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-2xl font-bold">QR Code Generator</h1>
	<input
		type="text"
		bind:value={url}
		placeholder="Enter URL"
		class="mb-4 w-72 rounded border p-2"
	/>
	<button onclick={generateQRCode} class="cursor-pointer rounded p-2">Generate QR Code</button>
	{#if qrCodeDataUrl}
		<img
			src={qrCodeDataUrl}
			alt="QR Code"
			class="mt-4 size-[600px] border border-ctp-text"
			style="width: 200px; height: 200px;"
		/>
		<button onclick={saveQRCode} class="mt-4 cursor-pointer rounded bg-ctp-green p-2 text-ctp-base"
			>Save QR Code</button
		>
	{/if}
</main>
