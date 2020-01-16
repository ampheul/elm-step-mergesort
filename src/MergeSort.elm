module MergeSort exposing
    ( MergeSorting
    , MergeSortResult
    , choices
    , mergeSortWorstCase
    , mergeSortBestCase
    , initMergeSort
    , mergeSortStep
    )



-- UTILITY


type alias Nonempty a =
    ( a, List a )

consNonempty : a -> Nonempty a -> Nonempty a
consNonempty x ( y, ys ) =
    ( x, y :: ys )



-- EXPORTS


choices : MergeSorting a -> ( a, a )
choices (MergeSorting _ _ (Merging _ ( x, _ ) ( y, _ ))) =
    ( x, y )


        
-- MERGE


type Merging a = Merging (List a) (Nonempty a) (Nonempty a)

type alias MergeResult a = Result (Nonempty a) (Merging a)

mergeStep : Order -> Merging a -> MergeResult a
mergeStep ord ((Merging stack left right) as merging) =
    case ( ord, merging ) of
        ( EQ, _ ) ->
            mergeStep GT merging

        ( GT, Merging _ ( l, x :: xs ) _ ) ->
            Ok <| Merging (l :: stack) ( x, xs ) right

        ( LT, Merging _ _ ( r, x :: xs ) ) ->
            Ok <| Merging (r :: stack) left ( x, xs )

        ( GT, Merging _ ( l, [] ) ( r, rs ) ) ->
            Err <| List.foldl consNonempty ( l, r :: rs ) stack

        ( LT, Merging _ ( l, ls ) ( r, [] ) ) ->
            Err <| List.foldl consNonempty ( r, l :: ls ) stack


                
-- MERGESORT


type MergeSorting a
    = MergeSorting (List (Nonempty a)) (List (Nonempty a)) (Merging a)

type alias MergeSortResult a = Result (List a) (MergeSorting a) 

initMergeSort : List a -> MergeSortResult a
initMergeSort xs =
    case xs of
        x :: y :: ys ->
            Ok <|
                MergeSorting [] (List.map (\z -> ( z, [] )) ys) <|
                    Merging [] ( x, [] ) ( y, [] )

        _ ->
            Err xs


mergeSortStep : Order -> MergeSorting a -> MergeSortResult a
mergeSortStep ord ((MergeSorting merged unmerged merging) as sorting) =
    case ( mergeStep ord merging, merged, unmerged ) of
        ( Ok out, _, _ ) ->
            Ok <| MergeSorting merged unmerged out

        ( Err out, _, x :: y :: ys ) ->
            Ok <| MergeSorting (out :: merged) ys <| Merging [] x y

        ( Err out, _, [ x ] ) ->
            Ok <| MergeSorting merged [] <| Merging [] x out

        ( Err out, x :: xs, [] ) ->
            Ok <| MergeSorting [] xs <| Merging [] out x

        ( Err (x,xs), [], [] ) ->
            Err <| x::xs


mergeSortWorstCase : MergeSorting a -> Int
mergeSortWorstCase (MergeSorting merged unmerged (Merging stack ( l, ls ) ( r, rs ))) =
    let
        recurse ts xs =
            case ( ts, xs ) of
                ( _, x :: y :: ys ) ->
                    recurse ((x + y) :: ts) ys + x + y - 1

                ( _, [ x ] ) ->
                    recurse (x :: ts) []

                ( _ :: _ :: _, [] ) ->
                    recurse [] ts

                ( _, [] ) ->
                    0

        lengths =
            List.map (\( z, zs ) -> 1 + List.length zs)

        mergingLength =
            List.length ls + List.length rs + 2
    in
    recurse
        ((mergingLength + List.length stack) :: lengths merged)
        (lengths unmerged)
        + mergingLength
        - 1


mergeSortBestCase : MergeSorting a -> Int
mergeSortBestCase (MergeSorting merged unmerged (Merging stack ( l, ls ) ( r, rs ))) =
    let
        recurse ts xs =
            case ( ts, xs ) of
                ( _, x :: y :: ys ) ->
                    recurse ((x + y) :: ts) ys + min x y

                ( _, [ x ] ) ->
                    recurse (x :: ts) []

                ( _ :: _ :: _, [] ) ->
                    recurse [] ts

                ( _, [] ) ->
                    0

        lengths =
            List.map (\( z, zs ) -> 1 + List.length zs)

        mergingLength =
            List.length ls + List.length rs + List.length stack + 2
    in
    recurse
        (mergingLength :: lengths merged)
        (lengths unmerged)
        + min (List.length rs) (List.length ls)
        + 1

