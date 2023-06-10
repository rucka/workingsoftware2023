export const frombase64 = <T>(p: string) => {
  const decoded = base64urlDecode(p)
  return <T>JSON.parse(decoded)
}

export const tobase64 = (o: unknown) => {
  const payload = JSON.stringify(o)
  return base64urlEncode(payload)
}

function base64urlDecode(str: string) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString()
}

function base64urlUnescape(str: string) {
  str += new Array(5 - (str.length % 4)).join('=')
  return str.replace(/\-/g, '+').replace(/_/g, '/')
}

function base64urlEncode(str: string) {
  return base64urlEscape(Buffer.from(str).toString('base64'))
}

function base64urlEscape(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}
