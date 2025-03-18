<script>
    import { onMount } from 'svelte';
    import TextArea from '$lib/components/TextArea.svelte';
    import FileInput from '$lib/components/FileInput.svelte';
    
    /** @type {string} */
    let mdContent = $state('# Hello Markdown\n\nThis is a sample markdown document.');
    /** @type {string} */
    let cssContent = $state('body {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}');
    /** @type {string} */
    let selectedEngine = $state('html2pdf');
    /** @type {string} */
    let previewHtml = $state('');
    /** @type {boolean} */
    let generating = $state(false);
    /** @type {import('markdown-it')} */
    let markdownIt;
    /** @type {any} */
    let html2pdf;
    /** @type {any} */
    let jspdf;
    /** @type {function} */
    let htmlToCanvas;
    
    // File inputs
    /** @type {FileList|undefined} */
    let mdFiles;
    /** @type {FileList|undefined} */
    let cssFiles;
    
    onMount(async () => {
        // Load necessary libraries
        markdownIt = (await import('markdown-it')).default();
        html2pdf = (await import('html2pdf.js')).default;
        const jspdfModule = await import('jspdf');
        jspdf = jspdfModule.default;
        htmlToCanvas = (await import('html-to-image')).toCanvas;
        
        updatePreview();
    });
    
    /**
     * Updates the preview HTML based on the markdown content
     * @returns {void}
     */
    function updatePreview() {
        if (markdownIt) {
            previewHtml = markdownIt.render(mdContent);
        }
    }
    
    /**
     * Handles markdown file upload
     * @returns {Promise<void>}
     */
    async function handleMdFileUpload() {
        if (!mdFiles || mdFiles.length === 0) return;
        const file = mdFiles[0];
        mdContent = await file.text();
        updatePreview();
    }
    
    /**
     * Handles CSS file upload
     * @returns {Promise<void>}
     */
    async function handleCssFileUpload() {
        if (!cssFiles || cssFiles.length === 0) return;
        const file = cssFiles[0];
        cssContent = await file.text();
    }
    
    /**
     * Handles markdown input changes
     * @returns {void}
     */
    function handleMdInput() {
        updatePreview();
    }
    
    /**
     * Generates PDF based on selected engine
     * @returns {Promise<void>}
     */
    async function generatePdf() {
        if (!mdContent) return;
        generating = true;
        
        try {
            /** @type {HTMLElement} */
            const previewElement = document.getElementById('preview-container');
            
            // Apply CSS for PDF generation
            const styleElement = document.createElement('style');
            styleElement.textContent = cssContent;
            previewElement.appendChild(styleElement);
            
            switch (selectedEngine) {
                case 'html2pdf':
                    await html2pdf().from(previewElement).save('document.pdf');
                    break;
                    
                case 'wkhtmltopdf':
                    // Using jsPDF with html-to-image as alternative
                    const canvas = await htmlToCanvas(previewElement);
                    const pdf = new jspdf({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });
                    
                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
                    pdf.save('document.pdf');
                    break;
                    
                case 'pdflatex':
                    // Simple jsPDF implementation as alternative
                    const doc = new jspdf();
                    const plainText = mdContent.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '');
                    doc.text(plainText, 10, 10);
                    doc.save('document.pdf');
                    break;
            }
            
            // Remove the style element after generating PDF
            previewElement.removeChild(styleElement);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please check console for details.');
        } finally {
            generating = false;
        }
    }
</script>

<svelte:head>
    <title>MD to PDF - Dev Tools</title>
</svelte:head>

<div class="max-w-5xl mx-auto p-4">
    <h1 class="text-2xl font-bold text-ctp-text mb-4">Markdown to PDF Converter</h1>
    <p class="text-ctp-subtext0 mb-6">Inspired by <a href="https://md-to-pdf.fly.dev/" target="_blank" class="text-ctp-blue underline">md-to-pdf.fly.dev</a></p>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left column: Input -->
        <div class="space-y-6">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-lg font-semibold">Markdown</h2>
                    <div class="text-sm">
                        <input 
                            type="file" 
                            accept=".md,.markdown,.txt" 
                            bind:files={mdFiles}
                            on:change={handleMdFileUpload}
                            class="hidden" 
                            id="md-file-input"
                        >
                        <label 
                            for="md-file-input" 
                            class="cursor-pointer px-3 py-1 bg-ctp-surface0 rounded-lg hover:bg-ctp-surface1 transition-colors"
                        >
                            Upload File
                        </label>
                    </div>
                </div>
                <TextArea 
                    bind:value={mdContent} 
                    on:input={handleMdInput}
                    placeholder="Enter markdown here..." 
                    customClass="h-[300px] w-full"
                />
            </div>
            
            <div>
                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-lg font-semibold">CSS</h2>
                    <div class="text-sm">
                        <input 
                            type="file" 
                            accept=".css" 
                            bind:files={cssFiles}
                            on:change={handleCssFileUpload}
                            class="hidden" 
                            id="css-file-input"
                        >
                        <label 
                            for="css-file-input" 
                            class="cursor-pointer px-3 py-1 bg-ctp-surface0 rounded-lg hover:bg-ctp-surface1 transition-colors"
                        >
                            Upload File
                        </label>
                    </div>
                </div>
                <TextArea 
                    bind:value={cssContent} 
                    placeholder="Enter CSS here..." 
                    customClass="h-[200px] w-full"
                />
            </div>
            
            <div>
                <label class="block mb-2">PDF Engine:</label>
                <select 
                    bind:value={selectedEngine}
                    class="w-full p-2 border border-ctp-surface2 rounded-lg bg-ctp-surface0"
                >
                    <option value="html2pdf">weasyprint (html2pdf.js)</option>
                    <option value="wkhtmltopdf">wkhtmltopdf (jsPDF + html-to-image)</option>
                    <option value="pdflatex">pdflatex (CSS will have no effect)</option>
                </select>
            </div>
            
            <button 
                on:click={generatePdf} 
                disabled={generating || !mdContent}
                class="px-4 py-2 bg-ctp-mauve text-ctp-base rounded-lg w-full
                       hover:bg-ctp-pink disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
                {generating ? 'Generating...' : 'Generate PDF'}
            </button>
        </div>
        
        <!-- Right column: Preview -->
        <div>
            <h2 class="text-lg font-semibold mb-2">Preview</h2>
            <div 
                id="preview-container"
                class="border border-ctp-surface2 rounded-lg p-6 bg-white text-black min-h-[520px] overflow-auto"
            >
                {@html previewHtml}
            </div>
        </div>
    </div>
</div>
