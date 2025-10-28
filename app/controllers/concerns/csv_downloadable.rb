module CsvDownloadable
  def send_csv_response(data, filename_prefix)
    filename = filename_prefix

    # Encoding is set to iso-8859-1 to avoid problems with special characters.
    # Especially on Windows and Excel.
    send_data(
      data.force_encoding("iso-8859-1"),
      type: "text/csv; charset=iso-8859-1; header=present",
      filename: "#{filename}-#{DateTime.current.strftime('%Y-%M-%d-%H-%M')}.csv"
    )
  end
end
