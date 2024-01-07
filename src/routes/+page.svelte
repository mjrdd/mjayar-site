<script lang="ts">
    import { Button } from '$ui/button';
    import { readable } from 'svelte/store';
    import { Sun, Moon } from 'lucide-svelte';
    import { toggleMode } from 'mode-watcher';

    let dateStore = readable(new Date(), (set) => {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>Jay Ar</title>
</svelte:head>

<div class="flex justify-end space-x-2 p-4">
    <Button variant="ghost">
        {Intl.DateTimeFormat('en-us', { timeStyle: 'medium' }).format($dateStore)}
    </Button>
    <Button on:click={toggleMode} variant="outline" size="icon">
        <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
</div>

<div class="content-grid space-y-4">
    <h1 class="text-2xl">Hi!</h1>
    <p>I'm Jay Ar.</p>
</div>
