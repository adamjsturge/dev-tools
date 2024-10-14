<script>
  import QRCode from 'qrcode';

  let url = '';
  let qrCodeDataUrl = '';

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

<main class="flex flex-col items-center justify-center h-screen text-center">
  <h1 class="text-2xl font-bold mb-4">QR Code Generator</h1>
  <input type="text" bind:value={url} placeholder="Enter URL" class="mb-4 p-2 w-72 border rounded" />
  <button on:click={generateQRCode} class="p-2 bg-blue-500 text-white rounded cursor-pointer">Generate QR Code</button>
  {#if qrCodeDataUrl}
    <img src={qrCodeDataUrl} alt="QR Code" class="size-[600px] mt-4 border border-black" style="width: 200px; height: 200px;" />
    <button on:click={saveQRCode} class="p-2 bg-green-500 text-white rounded cursor-pointer mt-4">Save QR Code</button>
  {/if}
</main>