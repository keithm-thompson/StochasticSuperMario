class TextCanvas {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
    this.renderText(3, -1, 1);
  }

  renderText(lives, score, incrementalValue) {
    score += incrementalValue;
    let num = "0000000" + score;
    score =  num.substr(num.length-7);
    this.htmlElement.innerHTML = `MARIO: ${lives}` + '&emsp;&emsp;&emsp;' + ` ${score}`;
    return parseInt(score);
  }
}

export default TextCanvas;
