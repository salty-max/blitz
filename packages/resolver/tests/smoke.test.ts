import { PACKAGE } from '@blitz/resolver'
import { expect, test } from 'bun:test'

test('@blitz/resolver index loads', () => {
  expect(PACKAGE).toBe('@blitz/resolver')
})
