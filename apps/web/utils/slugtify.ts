export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")        // bỏ ký tự đặc biệt
    .replace(/\s+/g, "-")            // dấu cách → dấu gạch ngang
}