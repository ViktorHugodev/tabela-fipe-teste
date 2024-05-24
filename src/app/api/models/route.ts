// app/api/models/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  console.log('GET MODELS')
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get('brand')
  console.log('🚀 ~ GET ~ brand:', brand)

  if (!brand) {
    return NextResponse.json({ error: 'Brand is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`,
    )
    const data = await response.json()
    return NextResponse.json(data.modelos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 })
  }
}