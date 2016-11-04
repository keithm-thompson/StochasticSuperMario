require_relative '../models/score.rb'
class MarioController < Bezel::ControllerBase
  def index
    @high_scores = Score.all
    render :index
  end

  def update
    scores = Score.all
    if scores.length >= 10
      scores.sort!{ |el1, el2| el2.score <=> el1.score }
      score = scores.last
      score.initials = params['initials']
      score.score = params['score']
      score.update
    else
      score = Score.new(initials: params['initials'], score: params['score'])
      score.save
    end
    redirect_to '/'
  end
end
