module PostsHelper
  LOREM = %w(Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam aperiam atque commodi consequuntur delectus dolorum, earum eligendi ex harum iste magnam magni nulla placeat porro similique sunt suscipit voluptatibus.')

  def lorem(min, max)
    n = rand(min..max)
    LOREM[0..n].join(' ')
  end
end
