<script lang="ts">
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

	import Icon from "@iconify/svelte/offline";
	import biArrowClockwise from "@iconify-icons/bi/arrow-clockwise";
	import biArrowLeft from "@iconify-icons/bi/arrow-left";
	import biArrowRight from "@iconify-icons/bi/arrow-right";
	import biPlus from "@iconify-icons/bi/plus";
	import biSearch from "@iconify-icons/bi/search";
	import biThreeDotsVertical from "@iconify-icons/bi/three-dots-vertical";
	import biTrash from "@iconify-icons/bi/trash";

	export let data;

	const moreMenuPopup: PopupSettings = {
		event: "focus-click",
		target: "moreMenuList",
		placement: "bottom-end",
		middleware: {
			offset: 12
		}
	};
</script>

<div class="flex h-full flex-col">
	<div class="flex flex-shrink justify-end gap-2 p-4">
		<div class="flex-1">
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] !bg-transparent">
				<div class="input-group-shim">
					<Icon icon={biSearch} />
				</div>
				<input type="search" placeholder="Search" />
			</div>
		</div>
		<a href="/url-shortener/create" class="btn variant-soft-primary">
			<span><Icon icon={biPlus} /></span>
			<span>New</span>
		</a>
		<button type="button" class="btn variant-soft">
			<span><Icon icon={biArrowClockwise} /></span>
			<span>Refresh</span>
		</button>
		<div>
			<button type="button" use:popup={moreMenuPopup} class="btn-icon variant-soft">
				<Icon icon={biThreeDotsVertical} />
			</button>
			<div class="card list-nav z-50 min-w-[12rem] p-2 shadow-xl" data-popup="moreMenuList">
				<ul>
					<li>
						<button type="button" class="w-full">
							<span><Icon icon={biTrash} /></span>
							<span>Delete All</span>
						</button>
					</li>
				</ul>
				<div
					class="arrow border-l border-t border-white border-opacity-5 bg-surface-100-800-token" />
			</div>
		</div>
	</div>

	{#if data.list.items.length > 0}
		<div class="w-full overflow-x-auto">
			<table class="table !bg-transparent">
				<thead class="!bg-transparent">
					<tr>
						<th>&nbsp;</th>
						<th>KEY</th>
						<th>URL</th>
						<th>PUBLISHED</th>
						<th>ACCESS AFTER</th>
						<th>ACCESS UNTIL</th>
					</tr>
				</thead>
				<tbody>
					{#each data.list.items as item}
						<tr>
							<td>
								<input type="checkbox" class="mx-4 cursor-pointer" />
							</td>
							<td>{item.key}</td>
							<td>
								<a href={item.url}>{item.url}</a>
							</td>
							<td>{item.published}</td>
							<td>{item.access_after || "N/A"}</td>
							<td>{item.access_until || "N/A"}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="flex justify-end p-4">
			<div class="btn-group variant-soft">
				<a href="/url-shortener?page={data.list.page - 1}" class="!btn-sm fill-current">
					<Icon icon={biArrowLeft} />
				</a>
				<a href="/url-shortener" class="!btn-sm fill-current">
					{data.list.page} of {data.list.totalPages}
				</a>
				<a href="/url-shortener?page={data.list.page + 1}" class="!btn-sm fill-current">
					<Icon icon={biArrowRight} />
				</a>
			</div>
		</div>
	{/if}
</div>
