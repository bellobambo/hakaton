import { NextResponse } from "next/server";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c693750000c6c56590");

const databases = new Databases(client);

export async function POST(request) {
  try {
    const { Matric_Number, Full_Name, Passport } = await request.json();

    const response = await databases.createDocument(
      "66c697500037408588ce",
      "66c8165400080ed249cf",
      ID.unique(),
      { Matric_Number, Full_Name, Passport }
    );

    return NextResponse.json(
      { message: "Topic Created", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await databases.listDocuments(
      "66c697500037408588ce",
      "66c8165400080ed249cf"
    );

    return NextResponse.json(
      { message: "Documents retrieved successfully", data: response.documents },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return NextResponse.json(
      { error: "Failed to retrieve documents" },
      { status: 500 }
    );
  }
}
