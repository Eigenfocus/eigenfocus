import { configureLinkTooltip, linkTooltipConfig } from "@milkdown/kit/component/link-tooltip";

const customConfig = {
  linkIcon: '<i class="fa-solid fa-link"></i>',
  editButton: '<i class="fa-solid fa-pen"></i>',
  removeButton: '<i class="fa-solid fa-trash-can"></i>',
  confirmButton: '<i class="fa-solid fa-check"></i>',
  inputPlaceholder: "https://..."
}

export default function configure(ctx) {
  configureLinkTooltip(ctx)

  ctx.update(linkTooltipConfig.key, defaultConfig => {
    return {
      ...defaultConfig,
      ...customConfig
    }
  })
}
