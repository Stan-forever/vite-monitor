export function capitalizePath(path: string) {
  return path
    .split('/')
    .map(function (word, index) {
      // 对于路径中的每个单词，除了第一个（即路径的根），都将首字母大写
      if (index === 0) {
        return word
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
    })
    .join('/')
}
