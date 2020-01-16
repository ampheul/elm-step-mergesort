COMPILER = elm make
FLAGS = --output="src/elm.js"
SOURCES = src/Main.elm


all :
	$(COMPILER) $(FLAGS) $(SOURCES)
