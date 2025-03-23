import { html } from 'atomico'

import { configureLinkTooltip, linkTooltipConfig } from "@milkdown/kit/component/link-tooltip";

const customConfig = {
  linkIcon: () => html`<i class="fa-solid fa-link"></i>`,
  editButton: () => html`<i class="fa-solid fa-pen"></i>`,
  removeButton: () => html`<i class="fa-solid fa-trash-can"></i>`,
  confirmButton: () => html`<i class="fa-solid fa-check"></i>`,
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
