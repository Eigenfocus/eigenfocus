import { html } from "atomico"

import { tableBlockConfig } from "@milkdown/kit/component/table-block"

const customConfig = {
  renderButton: (renderType) => {
    switch (renderType) {
      case "add_row":
        return html`<i class="fa-solid fa-plus"></i>`
      case "add_col":
        return html`<i class="fa-solid fa-plus"></i>`
      case "delete_row":
        return html`<i class="fa-solid fa-trash-can"></i>`
      case "delete_col":
        return html`<i class="fa-solid fa-trash-can"></i>`
      case "align_col_left":
        return html`<i class="fa-solid fa-align-left"></i>`
      case "align_col_center":
        return html`<i class="fa-solid fa-align-center"></i>`
      case "align_col_right":
        return html`<i class="fa-solid fa-align-right"></i>`
      case "col_drag_handle":
        return html`<i class="fa-solid fa-grip-lines"></i>`
      case "row_drag_handle":
        return html`<i class="fa-solid fa-grip-lines-vertical"></i>`
    }
  }
}

export default function configure(ctx) {
  ctx.update(tableBlockConfig.key, defaultConfig => {
    return {
      ...defaultConfig,
      ...customConfig
    }
  })
}
