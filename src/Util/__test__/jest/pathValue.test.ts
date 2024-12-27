import * as _ from '../..'

describe('toPathValue', () => {

  it('simple', () => {
    expect(_.toPathValue({ a: [5, 9] }, 'a.1')).toBe(9)
    expect(_.toPathValue({ 1: 9 }, '1')).toBe(9)
    expect(_.toPathValue({ 1: 9 }, 1)).toBe(9)
    expect(_.toPathValue([1, 9], 1)).toBe(9)
    expect(_.toPathValue([1, 9], '1')).toBe(9)
    expect(_.toPathValue(1)).toBe(1)
  })
  it('undefined', () => {
    expect(_.toPathValue(new Map() as any, new Map() as any)).toBe(undefined)
    expect(_.toPathValue(new Map() as any, 1)).toBe(undefined)
    expect(_.toPathValue('', 1)).toBe(undefined)
    expect(_.toPathValue(new Map() as any, '1,1')).toBe(undefined)
  })
})