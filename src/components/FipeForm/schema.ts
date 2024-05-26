import * as yup from 'yup'
export const schema = yup.object().shape({
  brand: yup.string().required('Marca é obrigatória'),
  model: yup.string().required('Modelo é obrigatório'),
  year: yup.string().required('Ano é obrigatório'),
})
