import React from "react"

import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from "@milkdown/kit/core"

import { listItemBlockComponent } from "@milkdown/kit/component/list-item-block"
import { linkTooltipPlugin } from "@milkdown/kit/component/link-tooltip"
import { tableBlock } from "@milkdown/kit/component/table-block"

import { commonmark } from "@milkdown/kit/preset/commonmark"
import { gfm } from "@milkdown/kit/preset/gfm"
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener"
import { history } from "@milkdown/kit/plugin/history"
import { clipboard } from "@milkdown/kit/plugin/clipboard"
import { indent } from "@milkdown/kit/plugin/indent"
import { imageBlockComponent } from '@milkdown/kit/component/image-block'
import { trailing } from "@milkdown/kit/plugin/trailing"
import { menu } from '@milkdown-lab/plugin-menu'

import configureMenu from './MarkdownEditor/configure/menu'
import configureLinkTooltip from './MarkdownEditor/configure/link-tooltip'
import configureTableBlock from './MarkdownEditor/configure/table-block'
import configureImageBlock from './MarkdownEditor/configure/image-block'

function MilkdownEditor(props) {
  const editable = () => !props.readOnly;

  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);

        if (props.defaultValue) {
          ctx.set(defaultValueCtx, props.defaultValue)
        }

        if (props.bindTarget) {
          const target = document.querySelector(props.bindTarget)
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
            target.value = markdown
          })
        }

        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          editable,
        }));
      })
      .config(configureMenu)
      .config(configureLinkTooltip)
      .config(configureTableBlock)
      .config(configureImageBlock)
      .use(listener)
      .use(commonmark)
      .use(gfm)
      .use(clipboard)
      .use(indent)
      .use(menu)
      .use(history)
      .use(listItemBlockComponent)
      .use(linkTooltipPlugin)
      .use(tableBlock)
      .use(trailing)
      .use(imageBlockComponent)
  }, [])

  return (
    <Milkdown />
  )
}


function MarkdownEditor(props) {
  return (
    <React.StrictMode>
      <MilkdownProvider>
        <MilkdownEditor {...props}/>
      </MilkdownProvider>
    </React.StrictMode>
  )
}

export default MarkdownEditor
