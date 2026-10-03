import { $prose } from "@milkdown/kit/utils"
import { serializerCtx } from "@milkdown/kit/core"
import { Plugin } from "@milkdown/kit/prose/state"
import { listItemSchema } from "@milkdown/kit/preset/commonmark"

function findListItem(view, listItemType, blockDom) {
  let found = null

  view.state.doc.descendants((node, pos) => {
    if (found) return false

    if (node.type === listItemType && view.nodeDOM(pos) === blockDom) {
      found = { node, pos }
      return false
    }
  })

  return found
}

export function readonlyTaskToggle(onToggle) {
  return $prose((ctx) => new Plugin({
    props: {
      handleDOMEvents: {
        click: (view, event) => {
          if (view.editable) return false

          const label = event.target.closest?.(".label-wrapper")
          if (!label) return false

          const blockDom = label.closest(".milkdown-list-item-block")
          const item = findListItem(view, listItemSchema.type(ctx), blockDom)
          if (!item || item.node.attrs.checked == null) return false

          event.preventDefault()
          event.stopPropagation()

          const { node, pos } = item
          view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, checked: !node.attrs.checked }))
          onToggle(ctx.get(serializerCtx)(view.state.doc))

          return true
        }
      }
    }
  }))
}
