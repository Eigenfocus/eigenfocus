import { tableBlockConfig } from "@milkdown/kit/component/table-block"

const customConfig = {
  renderButton: (renderType) => {
    switch (renderType) {
      case "add_row":
        return '<i class="fa-solid fa-plus"></i>'
      case "add_col":
        return '<i class="fa-solid fa-plus"></i>'
      case "delete_row":
        return '<i class="fa-solid fa-trash-can"></i>'
      case "delete_col":
        return '<i class="fa-solid fa-trash-can"></i>'
      case "align_col_left":
        return '<i class="fa-solid fa-align-left"></i>'
      case "align_col_center":
        return '<i class="fa-solid fa-align-center"></i>'
      case "align_col_right":
        return '<i class="fa-solid fa-align-right"></i>'
      case "col_drag_handle":
        return '<i class="fa-solid fa-grip-lines"></i>'
      case "row_drag_handle":
        return '<i class="fa-solid fa-grip-lines-vertical"></i>'
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
