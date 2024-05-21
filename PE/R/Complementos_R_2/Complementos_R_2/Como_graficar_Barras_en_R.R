# Graficas de barras en R
# ------------------------------------------------
# 1. graficas de barras con base graphics
# 2. graficas de barras con ggplot2

# cargando los datos
data(mtcars)

# viendo los datos
head(mtcars)

# generando tabla agrupada
table(mtcars$cyl)

# grafica de barras basica
barplot(table(mtcars$cyl))

# editando grafica de barras
barplot(table(mtcars$cyl),
        horiz = 'TRUE',
        col = 'green',
        border = 'red',
        main = 'grafica de barras',
        sub = 'subtitulo',
        xlab = 'cilindros',
        ylab = 'cantidad')

# cargar ggplot2
# install.packages("ggplot2")
library(ggplot2)

# grafica de barras
ggplot(data = mtcars,
       mapping = aes(x = factor(cyl))) + 
  geom_bar() +
  coord_flip()

# guardando grafica en variable
p<- ggplot(data = mtcars,
           mapping = aes(x = factor(cyl),
                         fill = factor(gear)))

# stacked bar chart
p + geom_bar(position = 'stack', stat = 'count')

# dogde bar chart
p + geom_bar(position = 'dodge', stat = 'count')

# stacked + percent barchart
p + geom_bar(position = 'fill', stat = 'count')
