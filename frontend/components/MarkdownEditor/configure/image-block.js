import { html } from 'atomico'

import { imageBlockConfig } from "@milkdown/kit/component/image-block"

const customConfig = {
  imageIcon: () => html`<i class="fa-solid fa-image"></i>`,
  captionIcon: () => html`<i class="fa-solid fa-file-pen"></i>`,
  uploadButton: () => html`<i class="fa-solid fa-file-arrow-up"></i>`,
  confirmButton: () => html`<i class="fa-solid fa-check"></i>`,
  captionPlaceholderText: "..."
}

export default function configure(ctx) {
  ctx.update(imageBlockConfig.key, defaultConfig => {
    return {
      ...defaultConfig,
      ...customConfig
    }
  })
}
