import Data.Bifunctor (Bifunctor (first))
import Data.Ix (inRange)

ranks :: Int
ranks = 8

maxRankIndex :: Int -> Int
maxRankIndex ranks = ranks * 2 - 1

data User = User
  { userRankIndex :: Int,
    userProgress :: Int
  }

newUser :: User
newUser =
  User
    { userRankIndex = 0,
      userProgress = 0
    }

toRankIndex :: Int -> Maybe Int
toRankIndex rank
  | inRange (-ranks, -1) rank = Just $ rank + ranks
  | inRange (1, ranks) rank = Just $ rank + ranks - 1
  | otherwise = Nothing

fromRankIndex :: Int -> Maybe Int
fromRankIndex rankIndex
  | inRange (0, ranks - 1) rankIndex = Just $ rankIndex - ranks
  | inRange (ranks, maxRankIndex ranks) rankIndex = Just $ rankIndex - ranks + 1
  | otherwise = Nothing

rank :: User -> Int
rank user = case fromRankIndex $ userRankIndex user of
  Just rank -> rank
  Nothing -> error "Invalid rank"

progress :: User -> Int
progress = userProgress

incProgress :: Int -> User -> User
incProgress activityRank user = case toRankIndex activityRank of
  Just activityRankIndex ->
    let progressChange = case activityRankIndex - userRankIndex user of
          diff
            | diff >= 1 -> 10 * diff * diff
            | diff == 0 -> 3
            | diff == -1 -> 1
            | otherwise -> 0
        totalProgress = userProgress user + progressChange
        (newRankIndex, newProgress) = first (min (maxRankIndex ranks) . (+ userRankIndex user)) (totalProgress `divMod` 100)
     in user
          { userRankIndex = newRankIndex,
            userProgress = if newRankIndex == maxRankIndex ranks then 0 else newProgress
          }
  Nothing -> error "Invalid rank"
