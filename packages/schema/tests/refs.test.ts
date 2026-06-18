import { parseRefs, refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('cross-reference parsing', () => {
  test('splits text and [[key]] / [[key|label]] references', () => {
    expect(
      parseRefs('if they have [[dodge]], treat as [[push-back|Push Back]].')
    ).toEqual([
      { kind: 'text', text: 'if they have ' },
      { kind: 'ref', key: 'dodge' },
      { kind: 'text', text: ', treat as ' },
      { kind: 'ref', key: 'push-back', label: 'Push Back' },
      { kind: 'text', text: '.' },
    ])
  })

  test('returns a single text segment when there are no references', () => {
    expect(parseRefs('plain text')).toEqual([
      { kind: 'text', text: 'plain text' },
    ])
  })

  test('refKeys returns the distinct keys in order', () => {
    expect(refKeys('[[dodge]] then [[block]] then [[dodge]]')).toEqual([
      'dodge',
      'block',
    ])
  })
})
