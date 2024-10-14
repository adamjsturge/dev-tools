<script>
	import Base64Layout from '../Base64Layout.svelte';

	/**
	 * @param {string} input
	 */
	function decodeBase64(input) {
		try {
			return atob(input);
		} catch (e) {
			return 'Invalid Base64 string';
		}
	}
</script>

<Base64Layout
	title="Base64 Decoder"
	inputPlaceholder="Enter Base64 string"
	buttonText="Decode"
	onButtonClick={decodeBase64}
/>
