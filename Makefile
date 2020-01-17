COMPILER = elm make
FLAGS = --output="elm.js"
SOURCES = src/Main.elm


all :
	$(COMPILER) $(FLAGS) $(SOURCES)
