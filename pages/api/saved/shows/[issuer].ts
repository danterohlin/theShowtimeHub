import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const issuer = req.query.issuer;
	const db = client.db("shows");
	switch (req.method) {
		case "POST":
			let bodyObject = JSON.parse(req.body);
			let alreadySaved = await db
				.collection("saved_shows")
				.count({ showId: bodyObject.showId }, { limit: 1 });
			if (alreadySaved === 1) {
				res.json({ status: "Already saved" });
			} else {
				let saveMovie = await db.collection("saved_shows").insertOne(bodyObject);
				res.json(saveMovie);
			}

			break;
		case "GET":
			const allMovies = await db
				.collection("saved_shows")
				.find({ userId: issuer })
				.toArray();
			res.json({ status: 200, data: allMovies });
			break;
	}
}
