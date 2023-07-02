<script lang="ts">
	import { AppBar, AppShell, Avatar, popup, type PopupSettings } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biBoxArrowLeft from "@iconify-icons/bi/box-arrow-left";
	import biGear from "@iconify-icons/bi/gear";
	import biPerson from "@iconify-icons/bi/person";

	export let data;
	$: console.log(data.auth);

	const avatarMenuPopup: PopupSettings = {
		event: "focus-click",
		target: "avatarMenuList",
		placement: "bottom-end",
		middleware: {
			offset: 12
		}
	};
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="h4 mx-8">URL Shortener</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center">
					<button type="button" use:popup={avatarMenuPopup} class="btn-icon">
						<Avatar
							src={data.auth.avatar}
							initials={data.auth.username || data.auth.email} />
					</button>
					<div
						class="card list-nav z-50 min-w-[16rem] p-2 shadow-xl"
						data-popup="avatarMenuList">
						<ul>
							<li>
								<a href="/account/profile">
									<span><Icon icon={biPerson} /></span>
									<span>Profile</span>
								</a>
							</li>
							<li>
								<a href="/account/settings">
									<span><Icon icon={biGear} /></span>
									<span>Settings</span>
								</a>
							</li>
							<li>
								<form
									method="POST"
									action="/logout?redirectTo=/login"
									class="contents">
									<button type="submit" class="w-full">
										<span><Icon icon={biBoxArrowLeft} /></span>
										<span>Logout</span>
									</button>
								</form>
							</li>
						</ul>
						<div
							class="arrow border-l border-t border-white border-opacity-5 bg-surface-100-800-token" />
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
