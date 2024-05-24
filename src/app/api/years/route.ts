import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get('brand')
  const model = searchParams.get('model')

  if (!brand || !model) {
    return NextResponse.json({ error: 'Marca e modelo são obrigatórios.' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos`,
      {
        next: {
          revalidate: 3600000, //1h
        },
      },
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar ano.' }, { status: 500 })
  }
}
