export function getFlatMenuList(menuList: any[]): any[] {
  let newMenuList: any[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap((item) => [
    item,
    ...(item.children ? getFlatMenuList(item.children) : [])
  ])
}
