<svelte:head>
    <title>Dev Tools</title>
</svelte:head>

<div class="ctp-container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Tools Menu</h1>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<a
			href="/base64/encode"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
		>
			Base64 Encode
		</a>
		<a
			href="/base64/decode"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
		>
			Base64 Decode
		</a>
		<a
			href="/qr-code"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
		>
			QR Code
		</a>
		<a
			href="/url/encode"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
			>
			URL Encode
		</a>
		<a
			href="/url/decode"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
			>
			URL Decode
		</a>
		<a
			href="/webp"
			class="block rounded-lg bg-ctp-surface0 p-6 text-center text-ctp-text shadow-md hover:bg-ctp-surface1 font-bold"
		>
			WebP Converter
		</a>
	</div>
</div>
