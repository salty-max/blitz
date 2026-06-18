import { PACKAGE } from '@blitz/data'
import { expect, test } from 'bun:test'

test('@blitz/data index loads', () => {
  expect(PACKAGE).toBe('@blitz/data')
})
