import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import ImageLibrary from "@/app/models/Library";

export async function GET(req: NextRequest) {
  try {

    await connectToDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    // console.log("Query received:", query);

    if (!query.trim()) {
      const allResults = await ImageLibrary.find().sort({ createdAt: -1 });
      return NextResponse.json({ results: allResults }, { status: 200 });
    }


    const queryWords = query.trim().split(/\s+/);

    // console.log("Query words:", queryWords);


    const filter = {
      $or: queryWords.map((word) => ({
        $or: [
          { imageName: { $regex: word, $options: "i" } },
          { category: { $regex: word, $options: "i" } },
          { subcategory: { $regex: word, $options: "i" } },
          { color: { $regex: word, $options: "i" } },
          { fabric: { $regex: word, $options: "i" } },
          { occasion: { $regex: word, $options: "i" } },
          { sleeveType: { $regex: word, $options: "i" } },
          { neckline: { $regex: word, $options: "i" } },
          { fitStyle: { $regex: word, $options: "i" } },
          { pattern: { $regex: word, $options: "i" } }
        ],
      })),
    };

    // console.log("Search filter:", JSON.stringify(filter, null, 2));


    const results = await ImageLibrary.find(filter).sort({ createdAt: -1 });

    // console.log("Results found:", results.length);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
