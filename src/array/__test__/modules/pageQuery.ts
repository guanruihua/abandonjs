import { test } from 'unit-testing-js'
import { pageQuery } from '../..'

const list = [
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
  { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc' }
]
{
  const { getPage } = pageQuery(
    [{ id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' }],
    {
      keepFields: ['a'],
      noRangeFields: ['a']
    }
  )
  const page = getPage({
    a: 1,
    id: [0, 2],
    b: ['10', '12']
  })

  // console.log(page)
  test('page3', {
    param: page.dataSource,
    tobe: [{ id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' }]
  })
}

{
  const { getPage } = pageQuery(
    [{ id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' }],
    {
      noRangeFields: ['a']
    }
  )
  const page = getPage({
    a: [0, 2],
    id: [0, 2],
    b: ['10', '12']
  })

  // console.log(page)
  test('page', {
    param: page.dataSource,
    tobe: [
      // { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
    ]
  })
}
{
  const { getPage } = pageQuery([
    { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' }
  ])
  const page = getPage({
    a: [0, 2],
    id: [0, 2],
    b: ['10', '12']
  })

  // console.log(page)
  test('page', {
    param: page.dataSource,
    tobe: [{ id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' }]
  })
}
{
  const { getPage } = pageQuery([
    { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
    { id: '3', a: 3, b: 13, c: 'code_1224', d: 'cccc' },
    { id: '2', a: 2, b: 12, c: 'code_1223', d: 'cccc' }
  ])
  const page = getPage(
    {},
    {
      sortBy: {
        id: 'asc'
      }
    }
  )

  // console.log(page)
  test('page', {
    param: page.dataSource,
    tobe: [
      { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
      { id: '2', a: 2, b: 12, c: 'code_1223', d: 'cccc' },
      { id: '3', a: 3, b: 13, c: 'code_1224', d: 'cccc' }
    ]
  })
}

{
  const { getPage, del, add } = pageQuery([
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
    { id: '11', a: 11, b: 21, c: 'code_1232', d: 'cccc' }
  ])

  del('2')
  del(['9', '11'])

  add({ id: '12', a: 1, b: 11, c: 'code_1222', d: 'cccc' })
  add([
    { id: '13', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
    { id: '14', a: 1, b: 11, c: 'code_1222', d: 'cccc' }
  ])

  const page = getPage()

  test(
    'pageQuery:del',
    {
      param: page.dataSource,
      tobe: [
        { id: '14', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
        { id: '13', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
        { id: '12', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
        { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
        { id: '3', a: 3, b: 13, c: 'code_1224', d: 'cccc' },
        { id: '4', a: 4, b: 14, c: 'code_1225', d: 'cccc' },
        { id: '5', a: 5, b: 15, c: 'code_1226', d: 'cccc' },
        { id: '6', a: 6, b: 16, c: 'code_1227', d: 'cccc' },
        { id: '7', a: 7, b: 17, c: 'code_1228', d: 'cccc' },
        { id: '8', a: 8, b: 18, c: 'code_1229', d: 'cccc' }
      ]
    },
    {
      param: page.pagination,
      tobe: {
        current: 1,
        pageSize: 10,
        total: 11
      }
    }
  )
}
{
  const { getPage } = pageQuery([...list])

  const page = getPage()

  test(
    'pageQuery',
    {
      param: page.dataSource,
      tobe: [
        { id: '1', a: 1, b: 11, c: 'code_1222', d: 'cccc' },
        { id: '2', a: 2, b: 12, c: 'code_1223', d: 'cccc' },
        { id: '3', a: 3, b: 13, c: 'code_1224', d: 'cccc' },
        { id: '4', a: 4, b: 14, c: 'code_1225', d: 'cccc' },
        { id: '5', a: 5, b: 15, c: 'code_1226', d: 'cccc' },
        { id: '6', a: 6, b: 16, c: 'code_1227', d: 'cccc' },
        { id: '7', a: 7, b: 17, c: 'code_1228', d: 'cccc' },
        { id: '8', a: 8, b: 18, c: 'code_1229', d: 'cccc' },
        { id: '9', a: 9, b: 19, c: 'code_1230', d: 'cccc' },
        { id: '10', a: 10, b: 20, c: 'code_1231', d: 'cccc' }
      ]
    },
    {
      param: page.pagination,
      tobe: {
        current: 1,
        pageSize: 10,
        total: 11
      }
    }
  )
}

// UnitTest(pageQuery)
// 	.addCases(
// 		{
// 			name: 'params: numberFuzzyQuery=true2',
// 			param: {
// 				list,
// 				params: {
// 					b: 1,
// 				},
// 				fields: {
// 					b: {
// 						numberFuzzyQuery: true,
// 					}
// 				},
// 				paging: { current: 1, pageSize: 3 }
// 			},
// 			tobe: {
// 				list: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' },
// 					{ a: 2, b: 12, c: 'code_1223', d: 'cccc' },
// 					{ a: 3, b: 13, c: 'code_1224', d: 'cccc' },
// 					{ a: 4, b: 14, c: 'code_1225', d: 'cccc' },
// 					{ a: 5, b: 15, c: 'code_1226', d: 'cccc' },
// 					{ a: 6, b: 16, c: 'code_1227', d: 'cccc' },
// 					{ a: 7, b: 17, c: 'code_1228', d: 'cccc' },
// 					{ a: 8, b: 18, c: 'code_1229', d: 'cccc' },
// 					{ a: 9, b: 19, c: 'code_1230', d: 'cccc' },
// 					{ a: 11, b: 21, c: 'code_1232', d: 'cccc' },
// 				],
// 				pageList: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' },
// 					{ a: 2, b: 12, c: 'code_1223', d: 'cccc' },
// 					{ a: 3, b: 13, c: 'code_1224', d: 'cccc' },
// 				],
// 				paging: { current: 1, pageSize: 3, total: 10 }
// 			},
// 		},
// 		{
// 			name: 'params: numberFuzzyQuery=true',
// 			param: {
// 				list,
// 				params: {
// 					b: 1,
// 				},
// 				numberFuzzyQuery: true,
// 				paging: { current: 1, pageSize: 3 }
// 			},
// 			tobe: {
// 				list: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' },
// 					{ a: 2, b: 12, c: 'code_1223', d: 'cccc' },
// 					{ a: 3, b: 13, c: 'code_1224', d: 'cccc' },
// 					{ a: 4, b: 14, c: 'code_1225', d: 'cccc' },
// 					{ a: 5, b: 15, c: 'code_1226', d: 'cccc' },
// 					{ a: 6, b: 16, c: 'code_1227', d: 'cccc' },
// 					{ a: 7, b: 17, c: 'code_1228', d: 'cccc' },
// 					{ a: 8, b: 18, c: 'code_1229', d: 'cccc' },
// 					{ a: 9, b: 19, c: 'code_1230', d: 'cccc' },
// 					{ a: 11, b: 21, c: 'code_1232', d: 'cccc' },
// 				],
// 				pageList: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' },
// 					{ a: 2, b: 12, c: 'code_1223', d: 'cccc' },
// 					{ a: 3, b: 13, c: 'code_1224', d: 'cccc' },
// 				],
// 				paging: { current: 1, pageSize: 3, total: 10 }
// 			},
// 		},
// 		{
// 			name: 'params: numberQuery',
// 			param: {
// 				list,
// 				params: {
// 					b: 1,
// 				},
// 				paging: { current: 1, pageSize: 3 }
// 			},
// 			tobe: {
// 				list: [],
// 				pageList: [],
// 				paging: { current: 1, pageSize: 3, total: 0 }
// 			},
// 		},
// 		{
// 			name: 'params',
// 			param: {
// 				list,
// 				params: {
// 					c: '1222'
// 				},
// 				paging: { current: 1, pageSize: 3 }
// 			},
// 			tobe: {
// 				list: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' }
// 				],
// 				pageList: [
// 					{ a: 1, b: 11, c: 'code_1222', d: 'cccc' }
// 				],
// 				paging: { current: 1, pageSize: 3, total: 1 }
// 			},
// 		},
// 		{
// 			name: 'paging1-3',
// 			param: {
// 				list,
// 				paging: { current: 2, pageSize: 3 }
// 			},
// 			tobe: {
// 				list: list,
// 				pageList: list.slice(3, 6),
// 				paging: { current: 2, pageSize: 3, total: list.length }
// 			},
// 		},
// 		{
// 			param: {
// 				list,
// 				paging: { current: 0, pageSize: 3 }
// 			},
// 			tobe: {
// 				list,
// 				pageList: [],
// 				paging: { current: 0, pageSize: 3, total: list.length }
// 			},
// 		},
// 		{
// 			param: {
// 				list,
// 				paging: { current: 1, pageSize: 0 }
// 			},
// 			tobe: {
// 				list,
// 				pageList: [],
// 				paging: { current: 1, pageSize: 0, total: list.length }
// 			},
// 		},

// 	)
// 	.run()
