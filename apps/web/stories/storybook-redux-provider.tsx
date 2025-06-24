// .storybook/storybook-redux-provider.tsx
import { Provider } from "react-redux"
import { store } from "@/store/store" // đường dẫn đến store của bạn

export function ReduxProviderDecorator(Story: any) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}