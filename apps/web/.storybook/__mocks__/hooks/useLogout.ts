// apps/web/__mocks__/hooks/useLogout.ts
export const useLogout = () => {
  return () => {
    console.log('📦 Mock logout called from Storybook')
  }
}