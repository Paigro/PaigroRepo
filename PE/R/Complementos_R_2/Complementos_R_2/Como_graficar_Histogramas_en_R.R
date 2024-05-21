# Como graficar histogramas en R
# ------------------------------------------------
# 1. histogramas con base graphics
# 2. histogramas con ggplot2

# cargando los datos
data("mtcars")
View(mtcars)

# histograma básico
hist(mtcars$hp) #Especifica la variable de interés para la cual se desea crear el histograma.

# editando histograma
hist(mtcars$hp,
     #breaks = 50,
     breaks = seq(50, 350, 50), #Este argumento define los límites de los intervalos en los que se agruparán los datos para construir el histograma. En este caso, se utiliza la función seq() para generar secuencialmente intervalos de 50 unidades desde 50 hasta 350.
     col = 'darkgray', #Define el color de las barras del histograma. En este caso, se especifica el color "darkgray".
     border = 'gray10', #Define el color del borde de las barras del histograma. En este caso, se especifica el color "gray10".
     main = 'titulo', #Este argumento especifica el título principal del histograma. En este caso, se establece como "titulo".
     xlab = 'variable x', #Define la etiqueta del eje x del histograma. En este caso, se etiqueta como "variable x".
     ylab = 'conteo') #Define la etiqueta del eje y del histograma. En este caso, se etiqueta como "conteo", indicando que muestra el conteo de observaciones en cada intervalo.

# cargar ggplot2 (para histograma más elaborado)
install.packages("ggplot2")
library(ggplot2)

# hacer un histograma en ggplot2
ggplot(data = mtcars,
       mapping = aes(x = hp,
                     fill = factor(vs))) + 
  geom_histogram(bins = 9,
                 position = 'identity',
                 alpha = 0.8) + labs(title = 'titulo',
                                     fill = 'vs motor',
                                     x = 'caballos de fuerza',
                                     y = 'conteos',
                                     subtitle = 'subtitulo',
                                     caption = 'fuente de los datos: R')

