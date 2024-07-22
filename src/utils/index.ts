export function getFlatMenuList(menuList: any[]): any[] {
  let newMenuList: any[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}

export const getAllBreadcrumbList = (
  menuList: any[],
  parent = [],
  result: { [key: string]: any } = {}
) => {
  for (const item of menuList) {
    result[item.path] = { ...parent, ...item }
    if (item.children.length) getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}
