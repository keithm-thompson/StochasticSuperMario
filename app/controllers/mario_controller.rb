require_relative '../models/score.rb'
class MarioController < Bezel::ControllerBase
  def index
    @high_scores = Score.all
    render :index
  end

  def update
    if params['id']
      score = Score.find(params['id'])
      score.update
    else
      score = Score.new(initials: params['name'], score: params['score'])
      score.save
    end
    redirect_to '/'
  end
end
