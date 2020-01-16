module Main exposing
    ( Model
    , Msg(..)
    , Picture
    , init
    , main
    , subscriptions
    , update
    , view
    )
import Browser exposing (Document)
import Browser.Events
import Browser.Dom
import File exposing (File)
import File.Select as Select
import Html exposing (Html, div, img, text, span, button, ol, li, h1, table, tr, td)
import Html.Attributes exposing (style, class, src)
import Html.Events exposing (onClick)
import Task as Task exposing (Task)
import Tuple exposing (first, second)
import Url as Url exposing (Url)
import MergeSort exposing
    ( MergeSorting
    , MergeSortResult
    , choices
    , mergeSortBestCase
    , mergeSortWorstCase
    , initMergeSort
    , mergeSortStep
    )


main =
    Browser.document
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


-- MODEL

type alias Model =
    { mergeSort :
        Maybe (Counter (MergeSortResult Picture))
    }

-- COUNTER

type alias Counter a = (Int, a)

mapCounter : (a->b) -> Counter a -> Counter b
mapCounter f (x, y) = (x+1, f y) 

makeCounter : Int -> a -> Counter a
makeCounter i x = (i, x)

initCounter : a -> Counter a
initCounter = makeCounter 0


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
            let
                step : Counter (MergeSortResult a) -> Counter (MergeSortResult a)
                step = mapCounter (Result.andThen (mergeSortStep choice))
            in
            ( { model | mergeSort = Maybe.map step mergeSort}
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
            ( { model | mergeSort = Just (0, initMergeSort thePictures) }
            , Cmd.none
            )


-- VIEW CODE

headerText = h1 [] [text "Step-Sorter"] 
imgContainerClass= class "col"
buttonClass = class "button-class"
showItemsClass = class "row"
choicesArea = class "choices-area"
infoClass = class "infobar"
mainPageClass = class "main"

            
containImg : Html msg -> Html msg
containImg im = div [imgContainerClass]  [im]
            
viewPicture (_, picUrl) width height= img [src picUrl] [] 
            
myButton : String -> Msg -> Html Msg
myButton label msg = button [ onClick msg, buttonClass ] [ text label ]

labelInt : String -> Int -> Html msg
labelInt label i = text <| label ++ (String.fromInt i)
        
viewChoices : Counter (MergeSorting Picture) -> List (Html Msg)
viewChoices (i, mergeSort) =
    let
        ((_, pic1Url), (_, pic2Url)) = choices mergeSort
    in
        [ h1 [] [text "Step-Sorter"]
        , div [showItemsClass] [containImg <| img [src pic1Url] [], containImg <| img [src pic2Url] []]
        , div [choicesArea]
              [ myButton "Left" (SortChoice GT)
              , myButton "Right" (SortChoice LT)
              ]
        , div [infoClass]
              [ div [] [labelInt "Best case : " <| mergeSortBestCase mergeSort]
              , div [] [labelInt "Worst Case: " <| mergeSortWorstCase mergeSort]
              , div [] [labelInt "Merges Completed: " i]
              ]
        ]

doneClass = class "done"

viewDone : List (Picture) -> List (Html Msg)
viewDone pictures =
    let
        theList : List Picture -> List (Html msg)
        theList xs =
            case xs of
                (picName, picUrl)::ys ->
                    (li [] [text picName, img [src picUrl] []])::(theList ys)
                [] -> []
    in
        
    [ h1 [] [text "Step-Sorter"]
    , ol [doneClass] <| theList pictures
    ]
       
view : Model -> Document Msg
view { mergeSort } =
    { title="Step-Sorter"
    , body =
        case mergeSort of
            Nothing ->
                [ button
                      [ onClick UploadPictures
                      , buttonClass
                      , mainPageClass
                      ]
                      [text "Upload Pictures"]
                ]
            Just (i, x) ->
                case x of
                    Ok ms ->
                        viewChoices (i, ms)
                    Err done ->
                        viewDone done
    
    }

subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
