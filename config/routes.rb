ROUTER = Bezel::Router.new
ROUTER.draw do
  get Regexp.new("/"), MarioController, :index
  post Regexp.new("/"), MarioController, :update
end
