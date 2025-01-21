<script>
    /** @type {string} */
    export let title;
    /** @type {number} */
    export let value;
    /** @type {string} */
    export let customClass = '';
</script>

<div class="bg-ctp-surface0 p-4 rounded-lg {customClass}">
    <h3 class="font-bold mb-2">{title}</h3>
    <p>{(value * 100).toFixed(2)}%</p>
</div>
