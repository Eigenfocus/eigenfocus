class UploadedBlob
  PURPOSE = :upload
  EXPIRES_IN = 1.hour

  def self.signed_id_for(blob)
    blob.signed_id(purpose: PURPOSE, expires_in: EXPIRES_IN)
  end

  def self.find(signed_id)
    ActiveStorage::Blob.find_signed(signed_id, purpose: PURPOSE) or raise ActiveRecord::RecordNotFound
  end
end
