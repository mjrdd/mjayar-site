<script lang="ts">
    import { readable } from 'svelte/store';
    import { Sun, Moon } from 'lucide-svelte';
    import { toggleMode } from 'mode-watcher';
    import { Button } from '$ui/button';
    import * as Tooltip from '$ui/tooltip';

    let dateStore = readable(new Date(), (set) => {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);

        return () => clearInterval(interval);
    });

    const BIRTHDATE = new Date(2000, 8, 5);

    function getAge() {
        let today = new Date();
        let age = today.getFullYear() - BIRTHDATE.getFullYear();
        let monthDiff = today.getMonth() - BIRTHDATE.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BIRTHDATE.getDate())) {
            age -= 1;
        }
        return age;
    }
</script>

<svelte:head>
    <title>Jay Ar</title>
</svelte:head>

<div class="flex justify-end space-x-2 p-4">
    <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
            <Button builders={[builder]} variant="ghost">
                {Intl.DateTimeFormat('en-us', { timeStyle: 'medium' }).format($dateStore)}
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
            <p>{Intl.DateTimeFormat('en-us', { dateStyle: 'full' }).format($dateStore)}</p>
        </Tooltip.Content>
    </Tooltip.Root>

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
    <h1 class="text-2xl">Hello!</h1>
    <div class="leading-8">
        <p>
            I'm Jay-ar, a {getAge()}-year-old civil engineering student from the Philippines.
        </p>
        <p>I enjoy watching anime, playing video games, and programming.</p>
    </div>
</div>
