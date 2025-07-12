export const upperWords = (str: string) => {
  return str.split(' ').map(w => w.toUpperCase()).join(' ')
}
