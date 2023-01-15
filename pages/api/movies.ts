import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("movies");
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let saveMovie = await db.collection("savedMovies").insertOne(bodyObject);
			res.json(saveMovie);
			break;
		case "GET":
			const allMovies = await db.collection("savedMovies").find({}).toArray();
			res.json({ status: 200, data: allMovies });
			break;
	}
}
