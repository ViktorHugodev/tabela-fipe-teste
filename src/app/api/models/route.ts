// app/api/models/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get('brand')

  if (!brand) {
    return NextResponse.json({ error: 'Modelo é necessário' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`,
      {
        next: {
          revalidate: 3600, //1h
        },
      },
    )
    const data = await response.json()
    return NextResponse.json(data.modelos)
  } catch (error) {
    return NextResponse.json({ error: 'Falha na requisição de modelo' }, { status: 500 })
  }
}
