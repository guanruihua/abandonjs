export function cronToText(cronExpression:string) {
  const cronParts = cronExpression.split(' ')
  const minute = cronParts[0]
  const hour = cronParts[1]
  const dayOfMonth = cronParts[2]
  const month = cronParts[3]
  const dayOfWeek = cronParts[4]

  let text = ''

  // 解析分钟
  if (minute === '0') {
    text += 'every minute'
  } else {
    text += `every ${minute} minutes`
  }

  // 解析小时
  if (hour !== '0') {
    text += ` past ${hour}`
  }

  // 解析日期
  if (dayOfMonth !== '*') {
    text += ` on the ${dayOfMonth}th`
  }

  // 解析月份
  if (month !== '*') {
    text += ` of ${month}`
  }

  // 解析星期几
  if (dayOfWeek !== '*') {
    text += ` on ${dayOfWeek}`
  }

  return text
}

export function cronToChinese(cronExpression: string) {
  const cronParts = cronExpression.split(' ')
  const minute = cronParts[0]
  const hour = cronParts[1]
  const dayOfMonth = cronParts[2]
  const month = cronParts[3]
  const dayOfWeek = cronParts[4]

  let text = ''

  // 解析分钟
  if (minute === '0') {
    text += '每分钟'
  } else {
    text += `每隔${minute}分钟`
  }

  // 解析小时
  if (hour !== '0') {
    text += `，从${hour}点开始`
  }

  // 解析日期
  if (dayOfMonth !== '*') {
    text += `，每月${dayOfMonth}号`
  }

  // 解析月份
  if (month !== '*') {
    text += `，在${month}月`
  }

  // 解析星期几
  if (dayOfWeek !== '*') {
    text += `，星期${dayOfWeek}`
  }

  return text
}