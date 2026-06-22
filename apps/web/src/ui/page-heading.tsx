import { type ComponentProps } from 'react'

import { Text } from './text'

/** A page's primary heading, set in the Blitz display face. */
export function PageHeading(props: ComponentProps<'h1'>) {
  return <Text as="h1" variant="title" {...props} />
}
