module TourHelper
  def with_tour(tour_key = nil, **options, &block)
    return content_tag(:div, capture(&block), options) unless tour_key

    tour_attributes = {
      data: {
        tour_tour_key_param: tour_key,
        action: "turbo:load@window->tour#start"
      }
    }

    content_tag(:div, capture(&block), options.deep_merge(tour_attributes))
  end
end
