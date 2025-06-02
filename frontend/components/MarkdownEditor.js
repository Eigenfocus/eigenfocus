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

const { useCallback } = React

function MilkdownEditor({ mirrorInputTargetSelector, mirrorInputTargetRef, onInput = () => {}, ...props }) {
  const handleMarkdownUpdate = useCallback((_ctx, markdown, _prevMarkdown) => {
    if (mirrorInputTargetSelector) {
      const target = document.querySelector(mirrorInputTargetSelector)
      target.value = markdown
    }

    if (mirrorInputTargetRef) {
      mirrorInputTargetRef.current.value = markdown
    }

    onInput(markdown)
  }, [mirrorInputTargetSelector, mirrorInputTargetRef, onInput])

  useEditor((root) => {
    const readOnly = !!props.readOnly;
    const editable = () => !readOnly;

    const editor = Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);

        if (props.defaultValue) {
          ctx.set(defaultValueCtx, props.defaultValue)
        }

        ctx.get(listenerCtx).markdownUpdated(handleMarkdownUpdate)

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
        <MilkdownEditor {...props} />
      </MilkdownProvider>
    </React.StrictMode>
  )
}

export default MarkdownEditor
