import { type IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

type Site = {
  url: string
  title: string
  name: string
  keywords: string[]
  titleTemplate: string
  description: string
  githubUsername: string
  favicons: IconDescriptor[]
}

const prodBaseURL = 'https://www.moondrift.fr/' //TODO : change this to your domain
const devBaseURL = 'http://localhost:3000'

const site: Site = {
  url: process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL,
  title: 'Wil. - Développeur React',
  name: 'Wil.',
  keywords: ['Next.js', 'React', 'TypeScript', 'Node.js'],
  titleTemplate: '| Wil. - Développeur React',
  description: 'Wil. • Remote • Développeur React',
  githubUsername: 'WilhelmRosental',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png'
    }
  ]
}

export default site