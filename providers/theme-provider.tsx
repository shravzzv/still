import React, { Fragment } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
