import { PACKAGE } from '@blitz/schema'
import { expect, test } from 'bun:test'

test('@blitz/schema index loads', () => {
  expect(PACKAGE).toBe('@blitz/schema')
})
