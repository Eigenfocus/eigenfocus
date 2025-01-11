import { Controller } from "@hotwired/stimulus"
import { DirectUpload } from "@rails/activestorage"
import Dropzone from "dropzone"

Dropzone.autoDiscover = false

export default class extends Controller {
  static targets = ["input", "previewsContainer", "previewTemplate"]

  connect() {
    this.dropZone = createDropZone(this)
    this.bindEvents()
  }

  bindEvents() {
    this.dropZone.on("addedfile", (file) => {
      setTimeout(() => { file.accepted && createDirectUploadController(this, file).start() }, 200)
    })

    this.dropZone.on("removedfile", (file) => {
      file.controller && this.removeElement(file.controller.hiddenInput)
    })

    this.dropZone.on("canceled", (file) => {
      file.controller && file.controller.xhr.abort()
    })
  }

  get headers() {
    const csrf = document.querySelector(`meta[name="csrf-token"]`).getAttribute("content")
    return { "X-CSRF-Token": csrf }
  }

  get url() { return this.inputTarget.getAttribute("data-direct-upload-url") }

  get maxFiles() { return this.data.get("maxFiles") || 15 }

  get maxFileSize() { return this.data.get("maxFileSize") || 4000 } // Max for Amazon S3 is 5GB

  get acceptedFiles() { return this.data.get("acceptedFiles") }

  get previewsContainer() { return `#${this.previewsContainerTarget.id}` }

  get previewTemplate() { return this.previewTemplateTarget.innerHTML }

  removeElement(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  removeExisting(event) {
    this.removeElement(event.target.parentNode)
  }
}

class DirectUploadController {
  constructor(source, file) {
    this.directUpload = createDirectUpload(file, source.url, this)
    this.source = source
    this.file = file
  }

  start() {
    this.file.controller = this
    this.hiddenInput = this.createHiddenInput()
    this.directUpload.create((error, attributes) => {
      if (error) {
        this.source.removeElement(this.hiddenInput)
        this.emitDropzoneError(error)
      } else {
        this.hiddenInput.value = attributes.signed_id
        this.file.previewTemplate.remove()
        this.emitDropzoneSuccess(attributes)
      }
    })
  }

  createHiddenInput() {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = this.source.inputTarget.name
    this.file.previewTemplate.append(input)

    return input
  }

  directUploadWillStoreFileWithXHR(xhr) {
    this.bindProgressEvent(xhr)
    this.emitDropzoneUploading()
  }

  bindProgressEvent(xhr) {
    this.xhr = xhr
    this.xhr.upload.addEventListener("progress", event => this.uploadRequestDidProgress(event))
  }

  uploadRequestDidProgress(event) {
    const progress = event.loaded / event.total * 100
    this.file.previewTemplate.querySelector(".dz-upload").style.width = `${progress}%`
  }

  emitDropzoneUploading() {
    this.file.status = Dropzone.UPLOADING
    this.source.dropZone.emit("processing", this.file)
  }

  emitDropzoneError(error) {
    this.file.status = Dropzone.ERROR
    this.source.dropZone.emit("error", this.file, error)
    this.source.dropZone.emit("complete", this.file)
  }

  emitDropzoneSuccess(attributes) {
    this.file.status = Dropzone.SUCCESS
    this.source.dropZone.emit("success", attributes)
    this.source.dropZone.emit("complete", attributes)
  }
}

function createDirectUploadController(source, file) {
  return new DirectUploadController(source, file)
}

function createDirectUpload(file, url, controller) {
  return new DirectUpload(file, url, controller)
}

function createDropZone(controller) {
  return new Dropzone(controller.element, {
    url: controller.url,
    headers: controller.headers,
    maxFiles: controller.maxFiles,
    maxFilesize: controller.maxFileSize,
    acceptedFiles: controller.acceptedFiles,
    addRemoveLinks: false,
    autoQueue: false,
    createImageThumbnails: true,
    previewsContainer: controller.previewsContainer,
    previewTemplate: controller.previewTemplate
  })
}