<script>
    /** @type {string} */
    export let value = '';
    /** @type {string} */
    export let placeholder = 'Start typing...';
    /** @type {string} */
    export let customClass = '';
    /** @type {boolean} */
    export let autofocus = false;

    /** @type {HTMLTextAreaElement} */
    let textareaElement;

    /** 
     * Focuses the textarea element
     * @returns {void}
     */
    export function focus() {
        textareaElement?.focus();
    }
</script>

<textarea
    bind:this={textareaElement}
    bind:value
    class="resize rounded border border-ctp-surface0 bg-ctp-surface0 p-4 font-mono focus:outline-none {customClass}"
    {placeholder}
    {autofocus}
    on:input
>
</textarea>
