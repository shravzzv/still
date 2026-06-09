import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Still',
    short_name: 'Still',
    description:
      'A deliberately simple, cross-platform todo app focused on clarity, calm, and getting things done.',
    start_url: '/',
    display: 'standalone',
    orientation: 'natural',
    theme_color: '#6F8196',
    background_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/desktop-home.png',
        form_factor: 'wide',
        label: 'Desktop view showing the home page',
        sizes: '1920x911',
      },
      {
        src: '/screenshots/desktop-add-dialog.png',
        form_factor: 'wide',
        label: 'Desktop view showing the add dialog',
        sizes: '1920x911',
      },
      {
        src: '/screenshots/desktop-edit-dialog.png',
        form_factor: 'wide',
        label: 'Desktop view showing the edit dialog',
        sizes: '1920x911',
      },
      {
        src: '/screenshots/mobile-home.png',
        form_factor: 'narrow',
        label: 'Mobile view showing the home page',
        sizes: '1080x1875',
      },
      {
        src: '/screenshots/mobile-add-dialog.png',
        form_factor: 'narrow',
        label: 'Mobile view showing the add dialog',
        sizes: '1080x1875',
      },
      {
        src: '/screenshots/mobile-edit-dialog.png',
        form_factor: 'narrow',
        label: 'Mobile view showing the edit dialog',
        sizes: '1080x1875',
      },
    ],
  }
}
