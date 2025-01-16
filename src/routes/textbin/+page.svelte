<svelte:head>
    <title>Text Bin - Dev Tools</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    let content = $state('');
    /**
	 * @type {HTMLTextAreaElement}
	 */
    let textareaElement;
    const STORAGE_KEY = 'text-bin-content';

    onMount(() => {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) {
            content = savedContent;
        }
        textareaElement?.focus();
    });

    /**
     * @param {Event & { currentTarget: EventTarget & HTMLTextAreaElement; }} event
	 */
    function handleInput(event) {
        content = event.currentTarget.value;
        if (content === '') {
            localStorage.removeItem(STORAGE_KEY);
        } else {
            localStorage.setItem(STORAGE_KEY, content);
        }
    }
</script>

<main class="flex h-screen flex-col items-center p-4">
    <h1 class="mb-4 text-2xl font-bold">Text Bin</h1>
    <textarea
        bind:this={textareaElement}
        bind:value={content}
        oninput={handleInput}
        class="h-[70vh] w-[90%] resize rounded border border-ctp-surface0 bg-ctp-surface0 p-4 font-mono focus:outline-none"
        placeholder="Start typing..."
    >
    </textarea>
</main>
