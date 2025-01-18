<script>
    import FileUnzipper from '../../components/FileUnzipper.svelte';

    /** @type {Array<{name: string, content: Blob}>} */
    let extractedFiles = [];

    /**
     * Downloads a file using its blob content
     * @param {string} filename
     * @param {Blob} content
     */
    function downloadFile(filename, content) {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Handles the extracted files from the FileUnzipper
     * @param {CustomEvent} event
     */
    function handleExtracted(event) {
        extractedFiles = event.detail;
    }

    /**
     * Downloads all files preserving folder structure
     */
    async function downloadAll() {
        try {
            // Check if File System Access API is supported
            if (!('showDirectoryPicker' in window)) {
                alert('Your browser doesn\'t support folder downloads. Please download files individually.');
                return;
            }

            const dirHandle = await window.showDirectoryPicker();
            
            for (const file of extractedFiles) {
                const pathParts = file.name.split('/');
                let currentHandle = dirHandle;

                // Create folder structure
                for (let i = 0; i < pathParts.length - 1; i++) {
                    const folderName = pathParts[i];
                    if (folderName) {
                        currentHandle = await currentHandle.getDirectoryHandle(folderName, { create: true });
                    }
                }

                // Create and write the file
                const fileName = pathParts[pathParts.length - 1];
                const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(file.content);
                await writable.close();
            }
        } catch (error) {
            console.error('Error downloading files:', error);
            alert('Failed to download files. Please try again.');
        }
    }
</script>

<svelte:head>
    <title>Unzip Files - Dev Tools</title>
</svelte:head>

<main class="ctp-container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4" id="page-title">Unzip Files</h1>
    
    <section aria-labelledby="upload-section">
        <h2 class="sr-only" id="upload-section">File Upload Section</h2>
        <FileUnzipper 
            onExtracted={handleExtracted}
            dropZoneClass="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        />
    </section>

    {#if extractedFiles.length > 0}
        <section aria-labelledby="extracted-files-title" class="mt-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold" id="extracted-files-title">
                    Extracted Files ({extractedFiles.length})
                </h2>
                <button
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    on:click={downloadAll}
                    aria-label="Download all files"
                >
                    Download All
                </button>
            </div>
            <div class="grid gap-4" role="list">
                {#each extractedFiles as file}
                    <div 
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        role="listitem"
                    >
                        <span class="truncate" title={file.name}>{file.name}</span>
                        <button
                            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            on:click={() => downloadFile(file.name, file.content)}
                            aria-label="Download {file.name}"
                        >
                            Download
                        </button>
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</main>
