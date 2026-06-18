import { PACKAGE } from '@blitz/dsl'
import { expect, test } from 'bun:test'

test('@blitz/dsl index loads', () => {
  expect(PACKAGE).toBe('@blitz/dsl')
})
