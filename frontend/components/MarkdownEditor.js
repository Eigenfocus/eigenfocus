import React, { useState } from "react"

import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx, editorViewCtx } from "@milkdown/kit/core"

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

  useEditor((root) => {
    const readOnly = !!props.readOnly;
    const editable = () => !readOnly;

    const editor = Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);

        if (props.defaultValue) {
          ctx.set(defaultValueCtx, props.defaultValue)
        }

        if (props.mirrorInputTargetSelector) {
          const target = document.querySelector(props.mirrorInputTargetSelector)
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
            target.value = markdown
          })
        }

        if (props.mirrorInputTargetRef) {
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
            props.mirrorInputTargetRef.current.value = markdown
          })
        }

        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          editable,
        }));
      })
      .config(configureLinkTooltip)
      .config(configureTableBlock)
      .config(configureImageBlock)
      .use(listener)
      .use(commonmark)
      .use(gfm)
      .use(clipboard)
      .use(indent)
      .use(history)
      .use(listItemBlockComponent)
      .use(linkTooltipPlugin)
      .use(tableBlock)
      .use(trailing)
      .use(imageBlockComponent)

      if (editable()) {
        editor.config(configureMenu).use(menu)
      }

      return editor
  }, [props.readOnly])

  return (
    <Milkdown />
  )
}

function MarkdownEditor(props) {
  return (
    <React.StrictMode>
      <MilkdownProvider>
        <MilkdownEditor mirrorInputTargetRef={props.mirrorInputTargetRef} mirrorInputTargetSelector={props.mirrorInputTargetSelector} defaultValue={props.defaultValue} readOnly={props.readOnly}/>
      </MilkdownProvider>
    </React.StrictMode>
  )
}

export default MarkdownEditor
