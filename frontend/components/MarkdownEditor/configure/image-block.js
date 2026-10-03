import { imageBlockConfig } from "@milkdown/kit/component/image-block"

const customConfig = {
  imageIcon: '<i class="fa-solid fa-image"></i>',
  captionIcon: '<i class="fa-solid fa-file-pen"></i>',
  uploadButton: '<i class="fa-solid fa-file-arrow-up"></i>',
  confirmButton: '<i class="fa-solid fa-check"></i>',
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
