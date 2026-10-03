import { $remark } from "@milkdown/kit/utils"

const IMAGE_TYPES = ["image", "image-block"]

function fillMissingImageTitles(node) {
  if (IMAGE_TYPES.includes(node.type) && node.title == null) {
    node.title = ""
  }

  node.children?.forEach(fillMissingImageTitles)
}

export const remarkImageTitle = $remark(
  "remark-image-title",
  () => () => fillMissingImageTitles
)
