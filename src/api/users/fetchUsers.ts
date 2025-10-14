import type { User } from "../../types/user";

export async function fetchUsers() {
	const response = await fetch("/users");

	if (response.status !== 200) return [];

	return (await response.json()) as User[];
}
