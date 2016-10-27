ROUTER = Bezel::Router.new
ROUTER.draw do
  get Regexp.new("/"), MarioController, :index
end
