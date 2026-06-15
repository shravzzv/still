import { withSerwist } from '@serwist/turbopack'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.0.103'],
}

export default withSerwist(nextConfig)
