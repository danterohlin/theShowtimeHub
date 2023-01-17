import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("shows");
	let bodyObject = JSON.parse(req.body);
	let removeMovie = await db.collection("saved_shows").deleteOne(bodyObject);
	res.json(removeMovie);
}
