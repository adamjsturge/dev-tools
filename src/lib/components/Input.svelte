<script>
    /** @type {string} */
    export let id;
    /** @type {string} */
    export let label;
    /** @type {number} */
    export let value;
    /** @type {number} */
    export let min = 1;
    /** @type {number|undefined} */
    export let max = undefined;
    /** @type {string} */
    export let customClass = '';
</script>

<div class="flex flex-col {customClass}">
    <label class="mb-2" for={id}>{label}</label>
    <input
        {id}
        type="number"
        bind:value
        {min}
        {max}
        class="p-2 border rounded-lg"
    />
</div>
