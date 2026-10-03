import { $command } from "@milkdown/kit/utils"
import { commandsCtx, editorStateCtx } from "@milkdown/kit/core"
import { listItemSchema, wrapInBulletListCommand } from "@milkdown/kit/preset/commonmark"

function closestListItemPos(doc, pos, listItemType) {
  const $pos = doc.resolve(pos)

  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type === listItemType) return $pos.before(depth)
  }

  return null
}

function selectedListItems(state, listItemType) {
  const { from, to } = state.selection
  const items = new Map()

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isTextblock) return

    const itemPos = closestListItemPos(state.doc, pos + 1, listItemType)
    if (itemPos != null) items.set(itemPos, state.doc.nodeAt(itemPos))
  })

  return items
}

function toggleItems(state, dispatch, items) {
  const allTasks = [...items.values()].every(item => item.attrs.checked != null)
  const tr = state.tr

  items.forEach((item, pos) => {
    const checked = allTasks ? null : (item.attrs.checked ?? false)
    tr.setNodeMarkup(pos, undefined, { ...item.attrs, checked })
  })

  dispatch?.(tr)
  return true
}

export function isInTaskList(ctx) {
  const state = ctx.get(editorStateCtx)
  const listItemType = listItemSchema.type(ctx)
  const itemPos = closestListItemPos(state.doc, state.selection.from, listItemType)

  return itemPos != null && state.doc.nodeAt(itemPos).attrs.checked != null
}

export const toggleTaskListCommand = $command("ToggleTaskList", (ctx) => () => (state, dispatch, view) => {
  const listItemType = listItemSchema.type(ctx)
  const items = selectedListItems(state, listItemType)

  if (items.size > 0) return toggleItems(state, dispatch, items)
  if (!dispatch) return true
  if (!ctx.get(commandsCtx).call(wrapInBulletListCommand.key)) return false

  return toggleItems(view.state, view.dispatch, selectedListItems(view.state, listItemType))
})
