require_relative '../models/score.rb'
class MarioController < Bezel::ControllerBase
  def index
    @high_scores = Score.all
    render :index
  end

  def update
    scores = Score.all
    if scores.length >= 10
      scores = Score.sort!{ |el1, el2| el2.score <=> el1.score }
      score = scores.last
      score.update(initials: params['initials'], score: params['score'])
    else
      score = Score.new(initials: params['initials'], score: params['score'])
      score.save
    end
    redirect_to '/'
  end
end
