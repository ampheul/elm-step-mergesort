module MergeSort exposing
    ( Sorting
    , choices
    , estimateBestCase
    , estimateWorstCase
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


choices : Sorting a -> ( a, a )
choices (Sorting _ _ (Merging _ ( x, _ ) ( y, _ ))) =
    ( x, y )



-- MERGE


type Merging a
    = Merging (List a) (Nonempty a) (Nonempty a)


mergeStep : Order -> Merging a -> Result (Nonempty a) (Merging a)
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


type Sorting a
    = Sorting (List (Nonempty a)) (List (Nonempty a)) (Merging a)


initMergeSort : List a -> Result (List a) (Sorting a)
initMergeSort xs =
    case xs of
        x :: y :: ys ->
            Ok <|
                Sorting [] (List.map (\z -> ( z, [] )) ys) <|
                    Merging [] ( x, [] ) ( y, [] )

        _ ->
            Err xs


mergeSortStep : Order -> Sorting a -> Result (Nonempty a) (Sorting a)
mergeSortStep ord ((Sorting merged unmerged merging) as sorting) =
    case ( mergeStep ord merging, merged, unmerged ) of
        ( Ok out, _, _ ) ->
            Ok <| Sorting merged unmerged out

        ( Err out, _, x :: y :: ys ) ->
            Ok <| Sorting (out :: merged) ys <| Merging [] x y

        ( Err out, _, [ x ] ) ->
            Ok <| Sorting merged [] <| Merging [] x out

        ( Err out, x :: xs, [] ) ->
            Ok <| Sorting [] xs <| Merging [] out x

        ( Err out, [], [] ) ->
            Err out


estimateWorstCase : Sorting a -> Int
estimateWorstCase (Sorting merged unmerged (Merging stack ( l, ls ) ( r, rs ))) =
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


estimateBestCase : Sorting a -> Int
estimateBestCase (Sorting merged unmerged (Merging stack ( l, ls ) ( r, rs ))) =
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
