import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/mongodb";
import ImageLibrary from "@/app/models/Library";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query")?.trim() || "";

        if (!query) {
            const allResults = await ImageLibrary.find().sort({ createdAt: -1 });
            return NextResponse.json({ results: allResults }, { status: 200 });
        }

        const searchRegex = new RegExp(query, "i");
        const queryWords = query.split(/\s+/);

        const mustContainAllWords = queryWords.map((word) => ({
            $or: [
                { imageName: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { category: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { subcategory: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { color: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { fabric: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { occasion: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { sleeveType: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { neckline: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { fitStyle: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
                { pattern: { $regex: new RegExp(`\\b${word}\\b`, "i") } },
            ],
        }));

        const containsAtLeastOneWord = queryWords.map((word) => ({
            $or: [
                { imageName: { $regex: new RegExp(word, "i") } },
                { category: { $regex: new RegExp(word, "i") } },
                { subcategory: { $regex: new RegExp(word, "i") } },
                { color: { $regex: new RegExp(word, "i") } },
                { fabric: { $regex: new RegExp(word, "i") } },
                { occasion: { $regex: new RegExp(word, "i") } },
                { sleeveType: { $regex: new RegExp(word, "i") } },
                { neckline: { $regex: new RegExp(word, "i") } },
                { fitStyle: { $regex: new RegExp(word, "i") } },
                { pattern: { $regex: new RegExp(word, "i") } },
            ],
        }));

        const filter = {
            $or: [
                { imageName: { $regex: searchRegex } },
                { category: { $regex: searchRegex } },
                { subcategory: { $regex: searchRegex } },
                { color: { $regex: searchRegex } },
                { fabric: { $regex: searchRegex } },
                { occasion: { $regex: searchRegex } },
                { sleeveType: { $regex: searchRegex } },
                { neckline: { $regex: searchRegex } },
                { fitStyle: { $regex: searchRegex } },
                { pattern: { $regex: searchRegex } },
                { $and: mustContainAllWords },
                { $or: containsAtLeastOneWord },
            ],
        };

        const results = await ImageLibrary.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error("Error fetching search results:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
