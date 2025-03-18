<script>
	import ToolLink from '../components/ToolLink.svelte';

	/**
	 * @param {string} string
	 * @param {string} term
	 * @param {number} ratio
	 * @returns {boolean}
	 * @description
	 */
	function fuzzySearch(string, term, ratio) {
		string = string.toLowerCase();
		term = term.toLowerCase();
		let matches = 0;
		if (string.indexOf(term) > -1) return true;
		for (let i = 0; i < term.length; i++) {
			string.indexOf(term[i]) > -1 ? matches += 1 : matches -= 1;
		}
		return (matches / string.length >= ratio || term === "");
	}

	/** @type {Array<{href: string, title: string, meta: string}>} */
	const tools = [
		{ href: "/base64/encode", title: "Base64 Encode", meta: "encode,base64,tool" },
		{ href: "/base64/decode", title: "Base64 Decode", meta: "decode,base64,tool" },
		{ href: "/qr-code", title: "QR Code", meta: "qr,code,tool" },
		{ href: "/url/encode", title: "URL Encode", meta: "encode,url,tool" },
		{ href: "/url/decode", title: "URL Decode", meta: "decode,url,tool" },
		{ href: "/webp", title: "WebP Converter", meta: "webp,convert,tool" },
		{ href: "/textbin", title: "TextBin", meta: "text,bin,tool" },
		{ href: "/word-counter", title: "Word Counter", meta: "word,count,tool" },
		{ href: "/unzip", title: "Unzip Files", meta: "unzip,extract,zip,tool" },
		{ href: "/deck-draw-odds", title: "Deck Draw Odds", meta: "deck,cards,probability,odds,tool" },
		{ href: "/card-assumption", title: "Card Assumption", meta: "cards,probability,assumption,tool" },
		{ href: "/markdown-editor", title: "Markdown Editor", meta: "markdown,editor,md,tool" },
	];

	/** @type {string} */
	let searchQuery = '';
	
	$: filteredTools = tools.filter(tool => 
		fuzzySearch(tool.title, searchQuery, 0.4) || 
		fuzzySearch(tool.href, searchQuery, 0.4) || 
		fuzzySearch(tool.meta, searchQuery, 0.4)
	);
</script>

<svelte:head>
    <title>Dev Tools</title>
</svelte:head>

<div class="ctp-container mx-auto p-4">
	<h1 class="mb-4 text-2xl font-bold">Tools Menu</h1>
	
	<div class="mb-4">
		<input
			type="text"
			placeholder="Search tools..."
			bind:value={searchQuery}
			class="w-full p-2 border rounded-lg"
		/>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		{#each filteredTools as tool}
			<ToolLink href={tool.href} title={tool.title} />
		{/each}
	</div>
</div>
