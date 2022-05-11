const getRatingName = (rating: number): string => {
  if (rating < 1200) {
    return 'Newbie'
  }
  if (rating < 1400) {
    return 'Pupil'
  }
  if (rating < 1600) {
    return 'Specialist'
  }
  if (rating < 1800) {
    return 'Expert'
  }
  return 'Candidate Master'
}

export default getRatingName
