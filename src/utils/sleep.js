export default function sleep (t) {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000)
  })
}
