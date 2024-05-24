// app/api/brands/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    console.log('🚀 ~ GET ~ response:', response)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Falha na requisição de brands' }, { status: 500 })
  }
}
