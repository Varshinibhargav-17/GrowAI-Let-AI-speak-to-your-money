import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { income, category } = await req.json();
    if (!income || income <= 0) return NextResponse.json({ error: "Invalid income" }, { status: 400 });

    let taxPayable = 0;

    // Simplified Indian tax slabs (FY 2025-26)
    if (income <= 300000) taxPayable = 0;
    else if (income <= 600000) taxPayable = (income - 300000) * 0.05;
    else if (income <= 900000) taxPayable = 15000 + (income - 600000) * 0.1;
    else if (income <= 1200000) taxPayable = 45000 + (income - 900000) * 0.15;
    else if (income <= 1500000) taxPayable = 90000 + (income - 1200000) * 0.2;
    else taxPayable = 150000 + (income - 1500000) * 0.3;

    // Adjustments based on category
    const multiplier = category === "freelancer" ? 1.05 : category === "business" ? 1.1 : 1;
    taxPayable *= multiplier;

    const effectiveRate = (taxPayable / income) * 100;

    return NextResponse.json({
      taxableIncome: income,
      taxPayable: Math.round(taxPayable),
      effectiveRate,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
