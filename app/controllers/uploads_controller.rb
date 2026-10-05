class UploadsController < ApplicationController
  include ActiveStorage::SetCurrent

  def create
    blob = ActiveStorage::Blob.create_before_direct_upload!(**blob_args)

    render json: blob.as_json(root: false).merge(
      signed_id: UploadedBlob.signed_id_for(blob),
      direct_upload: {
        url: blob.service_url_for_direct_upload,
        headers: blob.service_headers_for_direct_upload
      }
    )
  end

  private
  def blob_args
    params.expect(blob: [ :filename, :byte_size, :checksum, :content_type, metadata: {} ]).to_h.symbolize_keys
  end
end
