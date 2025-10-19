import TC from "@rolemodel/turbo-confirm"

TC.start({
  dialogSelector: "#confirm-modal",
  activeClass: "modal--active",
  acceptSelector: '#confirm-accept',
  denySelector: '.confirm-cancel',
  showConfirmCallback: element => {
    element.showModal()
     // without the blur, if the user press ENTER
     // it will open multiple modals because the element that
     // was focused is the one that opened the confirm dialog
    document.activeElement.blur()
  },
  hideConfirmCallback: element => {
    element.close()
  },
  messageSlotSelector: '#confirm-title'
})
