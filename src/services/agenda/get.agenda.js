import { api } from 'config/api'

export async function getAgenda() {
  const response = await fetch(`${api}/test.json`, {
    method: 'GET',
  })
  return response.json()
}
