module Main exposing (Model, Msg(..), Picture, init, initMergeSortTup, main, mergeSortStepTup, sequence, subscriptions, update, view)

import Browser
import Element exposing (Element, alignRight, centerX, centerY, column, el, fill, fillPortion, height, maximum, padding, px, rgb255, row, spacing, text, width)
import Element.Background as Background
import Element.Border as Border exposing (glow, innerGlow, rounded)
import Element.Events exposing (onClick)
import Element.Input as Input
import File exposing (File)
import File.Select as Select
import Html exposing (Html)
import MergeSort exposing (Sorting, choices, estimateBestCase, estimateWorstCase, initMergeSort, mergeSortStep)
import Task as Task exposing (Task)
import Tuple exposing (first, second)
import Url as Url exposing (Url)


main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


sequence : ( a, Result b c ) -> Result b ( a, c )
sequence ( x, y ) =
    Result.map (Tuple.pair x) y


type alias Model =
    { mergeSort :
        Maybe (Result ( Int, List Picture ) ( Int, Sorting Picture ))
    }


mergeSortStepTup : Order -> ( Int, Sorting a ) -> Result ( Int, List a ) ( Int, Sorting a )
mergeSortStepTup ord ( x, sorting ) =
    Ok sorting
        |> ((Result.andThen <| mergeSortStep ord)
                >> (Result.map <| Tuple.pair (x + 1))
                >> Result.mapError (\( y, ys ) -> ( x + 1, y :: ys ))
           )


initMergeSortTup =
    initMergeSort
        >> Result.map (Tuple.pair 0)
        >> Result.mapError (Tuple.pair 0)


type alias Flags =
    { theList : ( String, List String )
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { mergeSort = Nothing }
    , Cmd.none
    )


type alias Picture =
    ( String, String )


type Msg
    = SortChoice Order
    | UploadPictures
    | PicturesUploaded (List Picture)
    | PicturesSelected File (List File)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ mergeSort } as model) =
    case msg of
        SortChoice choice ->
            ( { model
                | mergeSort =
                    Maybe.map
                        (Result.andThen <|
                            mergeSortStepTup choice
                        )
                        mergeSort
              }
            , Cmd.none
            )

        UploadPictures ->
            ( model
            , Select.files [ "image/png", "image/jpg" ] PicturesSelected
            )

        PicturesSelected file files ->
            ( model
            , (file :: files)
                |> List.map (\x -> ( File.name x, File.toUrl x ))
                |> List.map (\( x, y ) -> Task.map (Tuple.pair x) y)
                |> Task.sequence
                |> Task.perform PicturesUploaded
            )

        PicturesUploaded thePictures ->
            ( { model
                | mergeSort = Just <| initMergeSortTup thePictures
              }
            , Cmd.none
            )



-- VIEW CODE


view : Model -> Html Msg
view { mergeSort } =
    let
        blue =
            rgb255 0 100 150

        green =
            rgb255 0 200 100

        background =
            Background.color <| rgb255 240 240 220

        bgc =
            Background.color

        userImage aa =
            el [ width <| fillPortion 1 ] <|
                Element.image
                    [ centerX
                    , centerY
                    , width fill 
                    ]
                    { description = "User uploaded image."
                    , src = aa
                    }

        myButton label msg =
            Input.button
                [ padding 10
                , rounded 5
                , Background.color <| blue
                , Element.mouseDown [ bgc green, glow green 10 ]
                , Element.mouseOver [ Border.shadow {offset=(0, 0), color=rgb255 0 0 0, blur=10, size=0.01} ]
                ]
                { label = text label, onPress = Just msg }

        stuff ( ( a, aa ), ( b, bb ) ) c d count =
            column
                [ centerX, centerY, width <| px 1200 ]
                [ row
                    [ centerX, spacing 50, height <| px 800]
                    [ el [width <| fillPortion 1, bgc green] <| userImage  aa
                    , el [width <| fillPortion 1, bgc blue] <| userImage  bb
                    ]
                , row
                    [ centerX, spacing 50, height <| fillPortion 1 ]
                    [ myButton a <| SortChoice GT
                    , myButton b <| SortChoice LT
                    ]
                , column
                    [ centerX, spacing 5, padding 0, height <| fillPortion 2]
                    [ text <| (++) "Merges Completed: " <| String.fromInt count
                    , text <| (++) "Worst Case Remaining: " <| String.fromInt c
                    , text <| (++) "Best Case Remaining: " <| String.fromInt d
                    ]
                ]
    in
    case mergeSort of
        Just (Err xs) ->
            Element.layout [ background ] <|
                column
                    [ centerX
                    , centerY
                    , bgc blue
                    , spacing 5
                    , padding 5
                    ]
                <|
                    List.singleton <|
                        Element.indexedTable
                            [ centerX
                            , padding 10
                            , spacing 10
                            , width <| px 800
                            ]
                            { data = xs |> Tuple.second
                            , columns =
                                let
                                    viewName _ ( x, _ ) =
                                        el
                                            [ centerY
                                            , bgc green
                                            , padding 10
                                            ]
                                        <|
                                            text x

                                    viewPicture _ ( _, y ) =
                                        el [width <| px 80] <| userImage y

                                    viewNumber i _ =
                                        el
                                            [ centerY
                                            , padding 5
                                            , bgc <| rgb255 255 255 255
                                            ]
                                        <|
                                            text <|
                                                String.fromInt i
                                                    ++ "."
                                in
                                [ { header =el [centerX] <|text "Rank"
                                  , width = px 40
                                  , view = viewNumber
                                  }
                                , { header = el [centerX] <|text "Name"
                                  , width = fillPortion 5
                                  , view = viewName
                                  }
                                , { header = el [centerX] <|text "Picture"
                                  , width = fillPortion 2
                                  , view = viewPicture
                                  }
                                ]
                            }

        Just (Ok ( x, sorting )) ->
            Element.layout [ background ] <|
                stuff (choices sorting) (estimateWorstCase sorting) (estimateBestCase sorting) x

        _ ->
            Element.layout [ background ] <|
                el [ centerX, centerY ] <|
                    myButton "Upload Photos" UploadPictures


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
