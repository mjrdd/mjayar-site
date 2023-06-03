<script lang="ts">
	import { Table, tableMapperValues, type TableSource } from "@skeletonlabs/skeleton";

	export let data;

	const tableUsers: TableSource = {
		head: ["Email", "Username", "Updated", "Verified"],
		body: tableMapperValues(data.users, ["email", "username", "updated", "verified"]),
		meta: tableMapperValues(data.users, ["id", "email", "username", "updated", "verified"])
	};
</script>

<div class="p-8">
	<Table interactive={true} source={tableUsers} />
</div>
