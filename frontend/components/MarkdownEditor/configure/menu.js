import { menu, menuConfigCtx } from '@milkdown-lab/plugin-menu'
import { editorStateCtx, prosePluginsCtx, schemaCtx } from '@milkdown/core'

function createButtonFor(command, options) {
  return {
    type: 'button',
    content: createIconContent(command),
    key: command,
    ...options,
  }
}

function createIconContent(command) {
  const icon = document.createElement('i')
  icon.className = classFor(command)
  return icon
}

function classFor(command) {
  switch(command) {
    case 'ToggleStrong':
      return 'fa-solid fa-bold'
    case 'ToggleEmphasis':
      return 'fa-solid fa-italic'
    case 'ToggleStrikeThrough':
      return 'fa-solid fa-strikethrough'
    case 'WrapInBulletList':
      return 'fa-solid fa-list-ul'
    case 'WrapInOrderedList':
      return 'fa-solid fa-list-ol'
    case 'ToggleLink':
      return 'fa-solid fa-link'
    case 'InsertImage':
      return 'fa-solid fa-image'
    case 'InsertTable':
      return 'fa-solid fa-table'
    case 'CreateCodeBlock':
      return 'fa-solid fa-code'
    case 'WrapInBlockquote':
      return 'fa-solid fa-quote-left'
    case 'InsertHr':
      return 'fa-solid fa-minus'
  }
}

const hasMark = (state, type) => {
  if (!type) return false
  const { from, $from, to, empty } = state.selection
  if (empty) return !!type.isInSet(state.storedMarks || $from.marks())

  return state.doc.rangeHasMark(from, to, type)
}

const getUndoDepth = (ctx) => {
  const historyKey = ctx.get(prosePluginsCtx).find(
    (i) => i.key === 'history$',
  )

  const state = ctx.get(editorStateCtx)
  const hist = historyKey?.getState(state)
  return hist ? hist.done.eventCount : 0
}

const getRedoDepth = (ctx) => {
  const historyKey = ctx.get(prosePluginsCtx).find(
    (i) => i.key === 'history$',
  )

  const state = ctx.get(editorStateCtx)
  const hist = historyKey?.getState(state)
  return hist ? hist.undone.eventCount : 0
}

const menuItens = [
  [
    createButtonFor('ToggleStrong', {
      active: (ctx) => {
        const state = ctx.get(editorStateCtx)
        const schema = ctx.get(schemaCtx)
        return hasMark(state, schema.marks.strong)
      },
    }),
    createButtonFor('ToggleEmphasis', {
      active: (ctx) => {
        const state = ctx.get(editorStateCtx)
        const schema = ctx.get(schemaCtx)
        return hasMark(state, schema.marks.emphasis)
      },
    }),
    createButtonFor('ToggleStrikeThrough', {
      active: (ctx) => {
        const state = ctx.get(editorStateCtx)
        const schema = ctx.get(schemaCtx)
        return hasMark(state, schema.marks.strike_through)
      },
    }),
  ],
  [
    {
      type: 'select',
      text: 'Heading',
      options: [
        { id: 1, content: 'Large Heading' },
        { id: 2, content: 'Medium Heading' },
        { id: 3, content: 'Small Heading' },
        { id: 0, content: 'Plain Text' },
      ],
      onSelect: (id) => (!!id ? ['WrapInHeading', id] : 'TurnIntoText'),
    },
    createButtonFor('WrapInBlockquote'),
  ],
  [
    createButtonFor('WrapInBulletList'),
    createButtonFor('WrapInOrderedList'),
  ],
  [
    createButtonFor('ToggleLink', {
      key: ['ToggleLink', { href: '' }]
    }),
    // Comment this until we implement actual image drop
    //createButtonFor('InsertImage'),
    createButtonFor('InsertTable'),
    createButtonFor('CreateCodeBlock'),
  ],
]


const config = {
  attributes: { class: 'milkdown-menu' },
  items: menuItens
}

export default function configure(ctx) {
  ctx.set(menuConfigCtx.key, config)
}
