import { handleScheduled } from './handler'

addEventListener('scheduled', (event) => {
  event.waitUntil(handleScheduled())
})
