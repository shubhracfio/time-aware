import React from 'react'

import { Link as MuiLink } from '@mui/joy'

// Next link
import NextLink from 'next/link'

/**
 * We need the features of Next/link to speed up the ui and we need the presentation style of @mui/joy/link.
 * This custom component combines both into one single component such that there is only one a tag in the html.
 * This link component has no underline on hover.
 */
export default function Link({ children, href, target = '_self', onClick }) {
  return (
    <MuiLink
      component={NextLink}
      color="primary"
      href={href}
      target={target}
      underline="none"
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </MuiLink>
  )
}
