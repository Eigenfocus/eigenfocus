import { listItemBlockConfig } from "@milkdown/kit/component/list-item-block"

function customConfig({ interactiveTasks }) {
  return {
    renderLabel: ({ label, listType, checked, readonly }) => {
      if (checked == null) {
        return listType === "bullet" ? "⦿" : label
      }

      const disabled = readonly && !interactiveTasks
      return `<input type="checkbox"${checked ? " checked" : ""}${disabled ? " disabled" : ""} />`
    }
  }
}

export default function configure({ interactiveTasks = false } = {}) {
  return (ctx) => {
    ctx.update(listItemBlockConfig.key, defaultConfig => {
      return {
        ...defaultConfig,
        ...customConfig({ interactiveTasks })
      }
    })
  }
}
