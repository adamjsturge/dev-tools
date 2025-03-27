<script lang="ts">
    import FileInput from '$lib/components/FileInput.svelte';
    import QualityControl from '$lib/components/QualityControl.svelte';
    import GIF from 'gif.js';

    let files: FileList;
    let quality = 1;
    let appendQuality = false;
    let converting = false;
    let progress = 0;
    let totalFrames = 0;
    let delay = 100; // milliseconds between frames
    let maxDuration = 5; // maximum duration in seconds for video conversion
    let fps = 10; // frames per second for video conversion

    async function extractVideoFrames(video: HTMLVideoElement, fps: number, maxDuration: number): Promise<HTMLCanvasElement[]> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const frames: HTMLCanvasElement[] = [];
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const duration = Math.min(video.duration, maxDuration);
        const frameCount = Math.floor(duration * fps);
        const frameInterval = 1 / fps;
        
        for (let i = 0; i < frameCount; i++) {
            video.currentTime = i * frameInterval;
            await new Promise(resolve => {
                video.onseeked = resolve;
            });
            
            ctx.drawImage(video, 0, 0);
            const frameCanvas = document.createElement('canvas');
            frameCanvas.width = canvas.width;
            frameCanvas.height = canvas.height;
            frameCanvas.getContext('2d')!.drawImage(canvas, 0, 0);
            frames.push(frameCanvas);
            
            progress = i;
        }
        
        return frames;
    }

    async function convertToGif() {
        if (!files || files.length === 0) return;
        
        converting = true;
        progress = 0;

        for (const file of files) {
            let frames: (HTMLImageElement | HTMLCanvasElement)[] = [];

            if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                await new Promise(resolve => {
                    video.onloadedmetadata = resolve;
                });
                totalFrames = Math.floor(Math.min(video.duration, maxDuration) * fps);
                frames = await extractVideoFrames(video, fps, maxDuration);
                URL.revokeObjectURL(video.src);
            } else {
                // Handle image files as before
                totalFrames = files.length;
                frames = await Promise.all(Array.from([file]).map(file => {
                    return new Promise<HTMLImageElement>((resolve) => {
                        const img = new Image();
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            img.src = e.target?.result as string;
                            img.onload = () => resolve(img);
                        };
                        reader.readAsDataURL(file);
                    });
                }));
            }

            const gif = new GIF({
                workers: 2,
                quality: Math.round(31 - (quality * 30)),
                width: frames[0]?.width || 800,
                height: frames[0]?.height || 600
            });

            frames.forEach(frame => {
                gif.addFrame(frame, { delay: file.type.startsWith('video/') ? 1000/fps : delay });
            });

            await new Promise(resolve => {
                gif.on('finished', (blob: Blob) => {
                    const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
                    const qualitySuffix = appendQuality ? `-q${Math.round(quality * 100)}` : '';
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${originalName}${qualitySuffix}.gif`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                    resolve(null);
                });
                gif.render();
            });
        }

        converting = false;
    }
</script>

<svelte:head>
    <title>GIF Maker - Dev Tools</title>
</svelte:head>

<div class="max-w-2xl mx-auto p-8">
    <h1 class="text-2xl font-bold text-ctp-text mb-6">GIF Maker</h1>
    
    <div class="flex flex-col gap-6">
        <FileInput bind:files accept="image/*,video/*" />
        <QualityControl bind:quality bind:appendQuality />

        <div class="flex flex-col gap-2">
            <label for="delay" class="text-sm font-medium">Frame Delay for Images (ms)</label>
            <input 
                type="number" 
                id="delay"
                bind:value={delay}
                min="10"
                max="1000"
                step="10"
                class="p-2 rounded-lg bg-ctp-surface0 border border-ctp-overlay0"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label for="fps" class="text-sm font-medium">FPS for Video</label>
            <input 
                type="number" 
                id="fps"
                bind:value={fps}
                min="1"
                max="30"
                step="1"
                class="p-2 rounded-lg bg-ctp-surface0 border border-ctp-overlay0"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label for="maxDuration" class="text-sm font-medium">Max Video Duration (seconds)</label>
            <input 
                type="number" 
                id="maxDuration"
                bind:value={maxDuration}
                min="1"
                max="30"
                step="1"
                class="p-2 rounded-lg bg-ctp-surface0 border border-ctp-overlay0"
            />
        </div>

        <button 
            on:click={convertToGif} 
            disabled={!files || converting}
            class="px-4 py-2 bg-ctp-mauve text-ctp-base rounded-lg
                   hover:bg-ctp-pink disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
            {#if converting}
                Converting... ({progress}/{totalFrames})
            {:else}
                Create GIF
            {/if}
        </button>
    </div>
</div>
