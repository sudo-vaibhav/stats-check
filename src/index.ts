import { changeDescription } from './handler'

addEventListener('scheduled', (event) => {
  event.waitUntil(
    (async () => {
      await changeDescription()
    })(),
  )
})
addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const newDescription = await changeDescription()
      return new Response(newDescription)
    })(),
  )
})
