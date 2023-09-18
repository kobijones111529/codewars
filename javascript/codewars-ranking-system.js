const minRank = -8
const maxRank = 8

const maxRankIndex = maxRank - minRank - 1

class User {
  constructor() {
    this.rank = -8
    this.progress = 0
  }

  /**
   * @param {number} activityRank
   */
  incProgress(activityRank) {
    const activityRankIndex = toRankIndex(activityRank)
    if (activityRankIndex === null) {
      throw new Error("Invalid rank")
    }

    const userRankIndex = toRankIndex(this.rank)
    if (userRankIndex === null) {
      throw new Error("Invalid rank")
    }

    const progressChange = calculateProgressChange(userRankIndex, activityRankIndex)
    const totalProgress = this.progress + progressChange
    const newRankIndex = Math.min(userRankIndex + Math.floor(totalProgress / 100), maxRankIndex)

    const newProgress = totalProgress % 100
    const newRank = fromRankIndex(newRankIndex)

    if (newRank === null) {
      throw new Error("Invalid rank")
    }

    this.rank = newRank
    this.progress = newRank === maxRank ? 0 : newProgress
  }
}

/**
 * @param {number} rank
 * @returns {number | null}
 */
function toRankIndex(rank) {
  if (rank >= minRank && rank < 0) {
    return rank - minRank
  } else if (rank > 0 && rank <= maxRank) {
    return rank - minRank - 1
  } else {
    return null
  }
}

/**
 * @param {number} rankIndex
 * @returns {number | null}
 */
function fromRankIndex(rankIndex) {
  if (rankIndex < 0) {
    return null
  } else if (rankIndex < -minRank) {
    return rankIndex + minRank
  } else if (rankIndex < maxRank - minRank) {
    return rankIndex + minRank + 1
  } else {
    return null
  }
}

/**
 * @param {number} userRankIndex
 * @param {number} activityRankIndex
 * @returns {number}
 */
function calculateProgressChange(userRankIndex, activityRankIndex) {
  const diff = activityRankIndex - userRankIndex
  if (diff > 0) {
    return 10 * diff * diff
  } else if (diff === 0) {
    return 3
  } else if (diff === -1) {
    return 1
  } else {
    return 0
  }
}
