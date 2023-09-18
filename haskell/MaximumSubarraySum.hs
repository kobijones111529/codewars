import Control.Monad (join)
import Data.Bifunctor (Bifunctor (bimap))
import Data.Foldable (Foldable (foldl'))

-- My final solution
maxSequence :: [Int] -> Int
maxSequence = snd . foldl' step (0, 0)
  where
    step (lastSum, currMax) el = join bimap (max $ lastSum + el) (0, currMax)

-- Other solutions

maxSequence1 :: [Int] -> Int
maxSequence1 = maximum . scanl ((+) . max 0) 0
