export async function handleUsers(db: D1Database) {
	const { results } = await db.prepare("SELECT * FROM users").run();

	return Response.json(results);
}
