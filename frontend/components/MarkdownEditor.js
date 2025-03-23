import React from "react"

import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { Crepe } from "@milkdown/crepe";

function CrepeEditor(props) {
  useEditor((root) => {
    return new Crepe({
      root,
      ...props,
    })
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
