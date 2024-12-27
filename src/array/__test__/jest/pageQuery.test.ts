import { pageQuery } from '../..'

const getList = () => [
  { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
  { id: '2', a: 2, b: 12, c: 'code_1223', d: 'cccc' },
  { id: '3', a: 3, b: 13, c: 'code_1224', d: 'cccc' },
  { id: '4', a: 4, b: 14, c: 'code_1225', d: 'cccc' },
  { id: '5', a: 5, b: 15, c: 'code_1226', d: 'cccc' },
  { id: '6', a: 6, b: 16, c: 'code_1227', d: 'cccc' },
  { id: '7', a: 7, b: 17, c: 'code_1228', d: 'cccc' },
  { id: '8', a: 8, b: 18, c: 'code_1229', d: 'cccc' },
  { id: '9', a: 9, b: 19, c: 'code_1230', d: 'cccc' },
  { id: '10', a: 10, b: 20, c: 'code_1231', d: 'cccc' },
  { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc', ra: [1, 2] },
]

describe('pageQuery', () => {
  it('filter:3', () => {
    const pq = pageQuery(getList())
    const page1 = pq.getPage(
      {
        a: ['aaa', 12],
      }
    )
    expect(page1.dataSource).toEqual([])
  })
  it('filter:2', () => {
    const pq = pageQuery(getList(), {
      noRangeFields: ['ra'],
      fields: {
        a: value => value,
      }
    })
    const page1 = pq.getPage(
      {
        ra: [1, 2],
        a: [10, 12],
        c: 'code'
      }
    )
    expect(page1.dataSource).toEqual([
      { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc', ra: [1, 2] },
    ])
  })
  it('filter', () => {
    const pq = pageQuery(getList(), {
      noRangeFields: ['ra'],
      handleValue: value => value,
      fields: {
        a: value => value,
      }
    })
    const page1 = pq.getPage(
      {
        ra: [1, 2],
        c: 'code'
      }
    )
    expect(page1.dataSource).toEqual([
      { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc', ra: [1, 2] },
    ])
  })
  it('query: 2', () => {
    const pq = pageQuery(getList(), {
      noRangeFields: ['ra']
    })
    const page1 = pq.getPage(
      {
        ra: [1, 2],
      }
    )
    expect(page1.dataSource).toEqual([
      { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc', ra: [1, 2] },
    ])
  })

  it('query', () => {
    const pq = pageQuery(getList(), {
      noRangeFields: ['ra']
    })
    const page1 = pq.getPage(
      {
        a: [1, 9],
        b: 11,
      },
      {
        sortBy: {
          a: 'desc',
          d: 'asc',
        }
      }
    )
    expect(page1.dataSource).toEqual([
      { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
    ])
  })
  it('add | del', () => {
    const pq = pageQuery(getList())
    const page1 = pq.getPage()
    expect(page1.pagination).toEqual({
      current: 1,
      pageSize: 10,
      total: 11,
    })
    pq.add({ id: 't-1', a: 100 })
    const page2 = pq.getPage()
    expect(page2.pagination).toEqual({
      current: 1,
      pageSize: 10,
      total: 12,
    })
    pq.add([
      { id: 't-2', a: 201 },
      { id: 't-3', a: 202 },
    ])

    const page3 = pq.getPage()
    expect(page3.pagination).toEqual({
      current: 1,
      pageSize: 10,
      total: 14,
    })

    pq.del('t-1')
    pq.del(['t-2', 't-3'])

    const page4 = pq.getPage()
    expect(page4.pagination).toEqual({
      current: 1,
      pageSize: 10,
      total: 11,
    })
    pq.add({})

    const page5 = pq.getPage()
    expect(page5.pagination).toEqual({
      current: 1,
      pageSize: 10,
      total: 12,
    })
  })
})