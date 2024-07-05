export default function hash(key) {
  let hashCode = 0
  let strKey = typeof key === 'string' ? key : key.toString()

  const primeNumber = 31
  for (let i = 0; i < strKey.length; i++) {
    hashCode = primeNumber * hashCode + strKey.charCodeAt(i)
  }

  return hashCode
}
