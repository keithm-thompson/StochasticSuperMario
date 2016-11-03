ROUTER = Bezel::Router.new
ROUTER.draw do
  get Regexp.new("/scores"), MarioController, :update
  get Regexp.new("/"), MarioController, :index
end
