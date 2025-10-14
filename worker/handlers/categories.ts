export async function handleCategories(db: D1Database) {
	const { results } = await db.prepare("SELECT * FROM categories").run();

	return Response.json(results);
}
