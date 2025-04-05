import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call the mcp_polygon_get_gas_price function
    const response = await fetch("http://localhost:3001/api/gas-price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ random_string: "dummy" }),
    });

    if (!response.ok) {
      throw new Error("Failed to get gas price");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting gas price:", error);
    return NextResponse.json(
      { error: "Failed to get gas price" },
      { status: 500 }
    );
  }
} 