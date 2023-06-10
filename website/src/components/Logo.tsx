import Image from 'next/image'
import styled from 'styled-components'
import LogoJpg from '../../public/logo.jpg'

const LogoImage = styled(Image)`
  z-index: 1;
`

export const Logo = () => (
  <LogoImage src={LogoJpg.src} alt="Cyberdyne System" width={50} height={50} object-fit="cover" />
)
