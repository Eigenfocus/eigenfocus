import React from "react"

import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/kit/core"
import { Crepe } from "@milkdown/crepe";

function CrepeEditor(props) {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      ...props,
    })

    crepe.on(listener => {
      listener. markdownUpdated((_, markdown, prevMarkdown) => {
        const target = document.querySelector(props.bindTarget)
        target.value = markdown
      });
    });

    return crepe
  }, [])

  return (
    <Milkdown />
  )
}

function MarkdownEditor(props) {
  return (
    <React.StrictMode>
      <MilkdownProvider>
        <CrepeEditor {...props}/>
      </MilkdownProvider>
    </React.StrictMode>
  )
}

export default MarkdownEditor
