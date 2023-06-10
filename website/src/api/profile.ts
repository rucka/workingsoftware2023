import { protectedGet, Signed } from './misc'

export const host = 'http://0.0.0.0:3003'

export type Profile = { id: string; name: string }

export const me: () => Promise<Signed<Profile>> = () => protectedGet(`${host}/me`)
