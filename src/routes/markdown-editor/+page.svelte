<svelte:head>
    <title>Markdown Editor - Dev Tools</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import TextArea from '$lib/components/TextArea.svelte';
    import { marked } from 'marked';

    /** @type {string} */
    let markdownText = '';
    
    /** @type {'split' | 'live' | 'window'} */
    let mode = $state('split');
    
    /** @type {boolean} */
    let showPreview = $state(true);
    
    /** @type {number} */
    let currentLineIndex = $state(0);
    
    /** @type {HTMLTextAreaElement} */
    let textAreaRef;
    
    /** @type {string} */
    let livePreview = $state('');
    
    const STORAGE_KEY = 'markdown-editor-content';

    onMount(() => {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) {
            markdownText = savedContent;
        }
        updateLivePreview();
    });

    /**
     * Process markdown text for rendering
     * @param {string} text
     * @returns {string}
     */
    function processMarkdown(text) {
        return marked.parse(text);
    }

    /**
     * Handle input changes
     * @param {Event} event
     */
    function handleInput(event) {
        markdownText = /** @type {HTMLTextAreaElement} */ (event.target).value;
        localStorage.setItem(STORAGE_KEY, markdownText);
        
        if (mode === 'live') {
            updateLivePreview();
        }
    }

    /**
     * Update the current line index
     */
    function updateCurrentLineIndex() {
        if (!textAreaRef) return;
        
        const value = textAreaRef.value;
        const selectionStart = textAreaRef.selectionStart;
        
        const lines = value.substring(0, selectionStart).split('\n');
        currentLineIndex = lines.length - 1;
        
        updateLivePreview();
    }

    /**
     * Update live preview based on the current text and cursor position
     */
    function updateLivePreview() {
        if (mode !== 'live' || !textAreaRef) return;
        
        const lines = markdownText.split('\n');
        const processedLines = lines.map((line, index) => {
            // If this is the line with the cursor, return the raw line
            if (index === currentLineIndex) {
                // For headers, let's do special handling
                if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
                if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
                if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
                if (line.startsWith('#### ')) return `<h4>${line.substring(5)}</h4>`;
                if (line.startsWith('##### ')) return `<h5>${line.substring(6)}</h5>`;
                if (line.startsWith('###### ')) return `<h6>${line.substring(7)}</h6>`;
                
                // For bold
                if (line.includes('**')) {
                    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                }
                
                // For italic
                if (line.includes('*')) {
                    return line.replace(/\*(.*?)\*/g, '<em>$1</em>');
                }
                
                return line;
            }
            return processMarkdown(line);
        });
        
        livePreview = processedLines.join('<br>');
    }

    /**
     * Change the editor mode
     * @param {'split' | 'live' | 'window'} newMode
     */
    function changeMode(newMode) {
        mode = newMode;
        
        if (mode === 'window') {
            showPreview = false;
        } else if (mode === 'split') {
            showPreview = true;
        } else if (mode === 'live') {
            showPreview = true;
            updateLivePreview();
        }
    }

    /**
     * Toggle between editor and preview in window mode
     */
    function toggleWindowMode() {
        showPreview = !showPreview;
    }
    
    $: renderedMarkdown = processMarkdown(markdownText);
</script>

<main class="flex flex-col h-screen p-4">
    <h1 class="text-2xl font-bold mb-4">Markdown Editor</h1>
    
    <div class="flex space-x-4 mb-4">
        <button 
            class="px-4 py-2 rounded-lg {mode === 'split' ? 'bg-ctp-lavender text-ctp-base' : 'bg-ctp-surface0'}"
            on:click={() => changeMode('split')}>
            Split View
        </button>
        <button 
            class="px-4 py-2 rounded-lg {mode === 'live' ? 'bg-ctp-lavender text-ctp-base' : 'bg-ctp-surface0'}"
            on:click={() => changeMode('live')}>
            Live Edit
        </button>
        <button 
            class="px-4 py-2 rounded-lg {mode === 'window' ? 'bg-ctp-lavender text-ctp-base' : 'bg-ctp-surface0'}"
            on:click={() => changeMode('window')}>
            Window Mode
        </button>
        
        {#if mode === 'window'}
            <button 
                class="px-4 py-2 rounded-lg bg-ctp-surface0"
                on:click={toggleWindowMode}>
                {showPreview ? 'Show Editor' : 'Show Preview'}
            </button>
        {/if}
    </div>
    
    <div class="flex-grow flex {mode === 'split' ? 'space-x-4' : ''} {mode === 'window' || mode === 'live' ? 'relative' : ''}">
        <!-- Editor -->
        {#if mode === 'split' || (mode === 'window' && !showPreview) || mode === 'live'}
            <div class="{mode === 'split' ? 'w-1/2' : 'w-full'} h-full">
                <TextArea
                    bind:this={textAreaRef}
                    bind:value={markdownText}
                    on:input={handleInput}
                    on:keyup={updateCurrentLineIndex}
                    on:click={updateCurrentLineIndex}
                    customClass="h-full w-full font-mono"
                    placeholder="Write your markdown here..."
                />
            </div>
        {/if}
        
        <!-- Preview -->
        {#if (mode === 'split' && showPreview) || (mode === 'window' && showPreview)}
            <div class="{mode === 'split' ? 'w-1/2' : 'w-full'} h-full overflow-auto bg-ctp-surface0 p-4 rounded-lg">
                <div class="markdown-preview">
                    {@html renderedMarkdown}
                </div>
            </div>
        {:else if mode === 'live'}
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div class="markdown-preview p-4">
                    {@html livePreview}
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    .markdown-preview :global(h1) {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 0.5em;
    }
    
    .markdown-preview :global(h2) {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 0.5em;
    }
    
    .markdown-preview :global(h3) {
        font-size: 1.3em;
        font-weight: bold;
        margin-bottom: 0.5em;
    }
    
    .markdown-preview :global(p) {
        margin-bottom: 1em;
    }
    
    .markdown-preview :global(ul), .markdown-preview :global(ol) {
        margin-bottom: 1em;
        padding-left: 2em;
    }
    
    .markdown-preview :global(ul) {
        list-style-type: disc;
    }
    
    .markdown-preview :global(ol) {
        list-style-type: decimal;
    }
    
    .markdown-preview :global(code) {
        font-family: monospace;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 0.2em;
        border-radius: 3px;
    }
    
    .markdown-preview :global(pre code) {
        display: block;
        padding: 1em;
        overflow-x: auto;
    }
    
    .markdown-preview :global(blockquote) {
        border-left: 4px solid #ddd;
        padding-left: 1em;
        font-style: italic;
    }
    
    .markdown-preview :global(a) {
        color: #0366d6;
        text-decoration: none;
    }
    
    .markdown-preview :global(a:hover) {
        text-decoration: underline;
    }
</style>
