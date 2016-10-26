ROUTER = Bezel::Router.new
ROUTER.draw do
  #Some sample routes:
  get Regexp.new(".*"), MarioController, :index
end
