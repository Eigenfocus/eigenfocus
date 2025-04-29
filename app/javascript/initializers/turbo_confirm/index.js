import TC from "@rolemodel/turbo-confirm"

TC.start({
  dialogSelector: "#confirm-modal",
  activeClass: "modal--active",
  acceptSelector: '#confirm-accept',
  denySelector: '.confirm-cancel',
  showConfirmCallback: element => {
    element.modal && element.modal.open()
    element.showModal && element.showModal()
  },
  hideConfirmCallback: element => {
    element.close && element.close()
    element.modal && element.modal.close()
  },
  messageSlotSelector: '#confirm-title'
})
