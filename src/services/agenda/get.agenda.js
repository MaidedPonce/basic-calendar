import { api } from 'config/api'

export async function getAgenda() {
  const response = await fetch(`${api}/test.json`, {
    mwthod: 'GET',
  })
  return response.json()
}
