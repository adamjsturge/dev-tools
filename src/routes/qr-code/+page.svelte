<svelte:head>
    <title>QR Code Generator - Dev Tools</title>
</svelte:head>

<script>
	import QRCode from 'qrcode';

	let url = $state('');
	let qrCodeDataUrl = $state('');

	const generateQRCode = async () => {
		try {
			// Generate QR code at high resolution to prevent pixelation
			const options = {
				errorCorrectionLevel: 'H', // High error correction
				type: 'image/png',
				quality: 1,
				margin: 2,
				width: 1024, // Generate at 1024x1024 for high quality
				color: {
					dark: '#000000',
					light: '#FFFFFF'
				}
			};
			qrCodeDataUrl = await QRCode.toDataURL(url, options);
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

<main class="min-h-screen bg-ctp-base">
	<div class="container mx-auto px-4 py-6 sm:py-8">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-3 text-3xl font-bold text-ctp-text sm:text-4xl">QR Code Generator</h1>
			<p class="text-ctp-subtext0 text-lg">Generate high-quality QR codes instantly</p>
		</div>

		<div class="mx-auto max-w-3xl">
			<!-- Input Card -->
			<div class="mb-6 rounded-2xl bg-ctp-surface0 p-6 shadow-lg sm:p-8">
				<div class="mb-6">
					<label for="url-input" class="mb-2 block text-sm font-medium text-ctp-text">
						Enter URL or Text
					</label>
					<input
						id="url-input"
						type="text"
						bind:value={url}
						placeholder="https://example.com or any text"
						class="w-full rounded-xl border border-ctp-surface2 bg-ctp-base px-4 py-3 text-ctp-text placeholder:text-ctp-subtext0 focus:border-ctp-blue focus:outline-none focus:ring-2 focus:ring-ctp-blue focus:ring-opacity-20"
					/>
				</div>
				
				<button 
					onclick={generateQRCode}
					disabled={!url}
					class="w-full rounded-xl bg-ctp-blue px-6 py-3 font-medium text-ctp-base transition-colors hover:bg-ctp-sapphire focus:outline-none focus:ring-2 focus:ring-ctp-blue focus:ring-offset-2 focus:ring-offset-ctp-base disabled:cursor-not-allowed disabled:opacity-50"
				>
					Generate QR Code
				</button>
			</div>

			<!-- QR Code Display -->
			{#if qrCodeDataUrl}
				<div class="rounded-2xl bg-ctp-surface0 p-6 shadow-lg sm:p-8">
					<h2 class="mb-4 text-center text-lg font-semibold text-ctp-text">Your QR Code</h2>
					
					<!-- QR Code Container with white background for better scanning -->
					<div class="mb-6 flex justify-center">
						<div class="rounded-xl bg-white p-4">
							<img
								src={qrCodeDataUrl}
								alt="Generated QR Code"
								class="h-auto w-full max-w-[300px] sm:max-w-[400px]"
								style="image-rendering: -webkit-optimize-contrast; image-rendering: optimizeQuality;"
							/>
						</div>
					</div>

					<!-- Action Buttons -->
					<div class="flex flex-col gap-3 sm:flex-row">
						<button 
							onclick={saveQRCode}
							class="flex-1 rounded-xl bg-ctp-green px-6 py-3 font-medium text-ctp-base transition-colors hover:bg-ctp-teal focus:outline-none focus:ring-2 focus:ring-ctp-green focus:ring-offset-2 focus:ring-offset-ctp-base"
						>
							<div class="flex items-center justify-center gap-2">
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Download QR Code
							</div>
						</button>
						
						<button 
							onclick={() => { url = ''; qrCodeDataUrl = ''; }}
							class="flex-1 rounded-xl bg-ctp-surface2 px-6 py-3 font-medium text-ctp-text transition-colors hover:bg-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-surface2 focus:ring-offset-2 focus:ring-offset-ctp-base"
						>
							Clear
						</button>
					</div>
					
					<!-- Info Note -->
					<div class="mt-6 rounded-xl bg-ctp-surface1 p-4">
						<div class="flex items-start gap-3">
							<svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-ctp-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<p class="text-sm text-ctp-subtext0">
								QR code generated at 1024x1024 resolution for maximum quality. The saved image will be high-resolution and suitable for printing.
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>
