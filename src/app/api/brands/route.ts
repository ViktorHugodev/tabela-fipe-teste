// app/api/brands/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('GET Brands')
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
  }
}
