<script>
    let textInput = '';
    let encodedOutput = '';
  
    function decodeBase64() {
      try {
        encodedOutput = btoa(textInput);
      } catch (e) {
        encodedOutput = 'Invalid string';
      }
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-2xl font-bold mb-4">Base64 Encoder</h1>
    <input
      type="text"
      bind:value={textInput}
      placeholder="Enter Base64 string"
      class="p-2 border border-gray-300 rounded mb-4 w-full max-w-md"
    />
    <button
      on:click={decodeBase64}
      class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
    >
      Encode
    </button>
    <div class="mt-4 p-2 border border-gray-300 rounded w-full max-w-md">
      <p class="break-words">{encodedOutput}</p>
    </div>
  </div>