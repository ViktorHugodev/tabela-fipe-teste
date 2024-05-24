// app/api/brands/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas', {
      next: {
        revalidate: 3600000, //1h
      },
    })

    const data = await response.json()
    console.log('🚀 ~ GET ~ data:', data)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Falha na requisição de brands' }, { status: 500 })
  }
}
