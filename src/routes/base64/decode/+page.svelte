<script>
  let base64Input = '';
  let decodedOutput = '';

  function decodeBase64() {
    try {
      decodedOutput = atob(base64Input);
    } catch (e) {
      decodedOutput = 'Invalid Base64 string';
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <h1 class="text-2xl font-bold mb-4">Base64 Decoder</h1>
  <input
    type="text"
    bind:value={base64Input}
    placeholder="Enter Base64 string"
    class="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
  />
  <button
    on:click={decodeBase64}
    class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
  >
    Decode
  </button>
  <div class="mt-4 p-2 border border-gray-300 rounded w-full max-w-md">
    <p class="break-words">{decodedOutput}</p>
  </div>
</div>