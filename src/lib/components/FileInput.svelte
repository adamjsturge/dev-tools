<script lang="ts">
    export let files: FileList;
    export let accept = "image/*";  // Default to only images
</script>

<div class="flex flex-col gap-2">
    <label for="files" class="text-sm font-medium">Select Files</label>
    <input
        type="file"
        id="files"
        {accept}
        multiple
        bind:files
        class="p-2 rounded-lg bg-ctp-surface0 border border-ctp-overlay0"
    />
</div>
