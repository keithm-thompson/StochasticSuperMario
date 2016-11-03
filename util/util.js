export const recordHighscore = (initials, score, success, error) => {
  $.ajax({
    method: 'POST',
    url: '/scores',
    data: { initials: initials, score: score },
    success,
    error
  });
};
