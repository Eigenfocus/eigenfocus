Ransack.configure do |config|
  # Change default search parameter key name.
  # Default key name is :q
  # config.search_key = :q
  config.custom_arrows = {
    up_arrow: '<i class="fa-solid fa-sort-up"></i>',
    down_arrow: '<i class="fa-solid fa-sort-down"></i>',
    default_arrow: '<i class="fa fa-sort"></i>'
  }
  # Raise errors if a query contains an unknown predicate or attribute.
  # Default is true (do not raise error on unknown conditions).
  # config.ignore_unknown_conditions = true

  # Globally display sort links without the order indicator arrow.
  # Default is false (sort order indicators are displayed).
  # This can also be configured individually in each sort link (see the README).
  # config.hide_sort_order_indicators = false
end
