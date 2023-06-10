export function EventuallyRedirectFromLocalhost() {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      window.location.href = window.location.href.replace(hostname, '0.0.0.0')
      return <></>
    }
  }
  return <></>
}
