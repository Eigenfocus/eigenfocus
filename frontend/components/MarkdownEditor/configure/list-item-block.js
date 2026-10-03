import { listItemBlockConfig } from "@milkdown/kit/component/list-item-block"

const customConfig = {
  renderLabel: ({ label, listType, checked, readonly }) => {
    if (checked == null) {
      return listType === "bullet" ? "⦿" : label
    }

    return `<input type="checkbox"${checked ? " checked" : ""}${readonly ? " disabled" : ""} />`
  }
}

export default function configure(ctx) {
  ctx.update(listItemBlockConfig.key, defaultConfig => {
    return {
      ...defaultConfig,
      ...customConfig
    }
  })
}
