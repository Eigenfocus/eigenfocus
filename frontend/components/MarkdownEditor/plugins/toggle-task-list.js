import { $command } from "@milkdown/kit/utils"
import { editorStateCtx } from "@milkdown/kit/core"
import { wrapIn } from "@milkdown/kit/prose/commands"
import { bulletListSchema, listItemSchema } from "@milkdown/kit/preset/commonmark"

function closestListItemPos(doc, pos, listItemType) {
  const $pos = doc.resolve(pos)

  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type === listItemType) return $pos.before(depth)
  }

  return null
}

function selectedListItems(doc, selection, listItemType) {
  const { from, to } = selection
  const items = new Map()

  doc.nodesBetween(from, to, (node, pos) => {
    if (!node.isTextblock) return

    const itemPos = closestListItemPos(doc, pos + 1, listItemType)
    if (itemPos != null) items.set(itemPos, doc.nodeAt(itemPos))

    return false
  })

  return items
}

function toggleItems(tr, items) {
  const allTasks = [...items.values()].every(item => item.attrs.checked != null)

  items.forEach((item, pos) => {
    const checked = allTasks ? null : (item.attrs.checked ?? false)
    tr.setNodeMarkup(pos, undefined, { ...item.attrs, checked })
  })

  return tr
}

export function isInTaskList(ctx) {
  const state = ctx.get(editorStateCtx)
  const listItemType = listItemSchema.type(ctx)
  const itemPos = closestListItemPos(state.doc, state.selection.from, listItemType)

  return itemPos != null && state.doc.nodeAt(itemPos).attrs.checked != null
}

export const toggleTaskListCommand = $command("ToggleTaskList", (ctx) => () => (state, dispatch) => {
  const listItemType = listItemSchema.type(ctx)
  const items = selectedListItems(state.doc, state.selection, listItemType)

  if (items.size > 0) {
    dispatch?.(toggleItems(state.tr, items))
    return true
  }

  let wrapTr
  if (!wrapIn(bulletListSchema.type(ctx))(state, tr => { wrapTr = tr })) return false
  if (!dispatch) return true

  dispatch(toggleItems(wrapTr, selectedListItems(wrapTr.doc, wrapTr.selection, listItemType)))
  return true
})
