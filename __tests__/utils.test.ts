import {buildTable, readTransformers} from '../src/utils.js'
import {describe, expect, it} from 'vitest'

/**
 *   Copyright 2024 Mike Penz
 */

describe('readTransformers', () => {
  it('should successfully parse default transformer', async () => {
    const transformer = readTransformers('[{"searchValue":"::","replaceValue":"/"}]')
    expect(transformer).toStrictEqual([
      {
        regex: /::/gu,
        searchValue: '::',
        replaceValue: '/'
      }
    ])
  })

  it('should successfully parse custom transformer', async () => {
    const transformer = readTransformers(
      '[{"searchValue":"\\\\.","replaceValue":"/"},{"searchValue":"_t\\\\z","replaceValue":".t"}]'
    )
    expect(transformer).toStrictEqual([
      {
        regex: /\./gu,
        searchValue: '\\.',
        replaceValue: '/'
      },
      {
        searchValue: '_t\\z',
        replaceValue: '.t'
      }
    ])
  })
})

describe('buildTable', () => {
  it('should close empty cells', async () => {
    expect(buildTable([[{data: '', header: true}, {data: 'Tests', header: true}], ['', 'A']])).toStrictEqual(
      '<table><tr><th></th><th>Tests</th></tr><tr><td></td><td>A</td></tr></table>'
    )
  })
})
