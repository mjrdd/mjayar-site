<script lang="ts">
	import { enhance } from "$app/forms";

	import GoogleSVG from "$lib/icons/google-icon.svg";
	import GithubSVG from "$lib/icons/github-icon.svg";
</script>

<form method="post" use:enhance class="flex w-full max-w-[18rem] flex-col gap-4">
	<button
		type="submit"
		formaction="?/authWithOAuth&provider=google"
		class="btn mx-2 grid w-full grid-cols-[2rem_1fr] bg-white text-gray-950">
		<span><img src={GoogleSVG} alt="google" class="w-6" /></span>
		<span>Continue with Google</span>
	</button>
	<button
		type="submit"
		formaction="?/authWithOAuth&provider=github"
		class="btn mx-2 grid w-full grid-cols-[2rem_1fr] bg-white text-gray-950">
		<span><img src={GithubSVG} alt="github" class="w-6" /></span>
		<span>Continue with Github</span>
	</button>
</form>
