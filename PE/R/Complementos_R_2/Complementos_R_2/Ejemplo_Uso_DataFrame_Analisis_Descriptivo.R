#                  ESTE SCRIPT EST? BASADO EN EL LIBRO            
# Brian S. Everitt, Thorsten Hothorn, A Handbook of Statistical Analyses # Using R  #

#vignette("Ch_introduction_to_R",package="HSAUR")
#edit(vignette("Ch_introduction_to_R",package="HSAUR"))
#vignette(package="HSAUR")

# Siempre que trabajemos con R debemos tener presente que tiene disponible documentación 
# de ayuda sobre el lenguaje y las funciones que utiliza. 
# En la URL http://CRAN.R-project.org/manuals.html
# pueden encontrarse manuales sobre diferentes aspectos del lenguaje R. #

help("mean")
?mean

# Aparte de las funcionalidades básicas del lenguaje, R tiene disponibles 
# diversos procedimientos estadísticos en la forma de 'paquetes', que son 
# colecciones de funciones, datasets y otros elementos relacionados. 
# 
# Por ejemplo, el libro mencionado arriba va acompañado de un paquete de R 
# que, entre otras cosas, contiene los conjuntos de datos de ejemplo. 
# Este paquete se llama HSAUR (siglas del título del libro). 
# Veamos como instalarlo y hacerlo accesible a la sesión actual de R. # 

install.packages("HSAUR")
library("HSAUR")

# Una vez que el paquete está instalado y cargado con la función library(), 
# podemos acceder a los conjuntos de datos que contiene.
#
# En particular, es importante saber que R maneja diferentes formatos de datos,
# siendo uno de los más útiles  en estadística el llamado 'data frame' por su 
# flexibilidad y compatibilidad con otros formatos y programas. 
#
# Carguemos un data frame del paquete HSAUR. #

data("Forbes2000",package = "HSAUR")

# Mediante el comando anterior, en el entorno global de esta sesión de R se 
# habrá creado una nueva entrada, esto es, un nuevo objeto Forbes2000,
# conteniendo el data frame correspondiente.
#
# El siguiente comando ls() permite ver las variables que existen actualmente en 
# tal entorno global. #

ls()

# Podríamos intentar echar un vistazo al contenido de este data frame usando la
# función print(). Pero esto no sería realmente muy útil de cara a hacernos una
# idea de cómo es este data frame. # 

print(Forbes2000)



# Es más recomendable comenzar por conocer la estructura del data frame con el 
# siguiente comando. #

str(Forbes2000)

# Así, vemos que el objeto Forbes2000 es un data frame con 2000 observaciones, 
# cada una de las cuales es una compañía o empresa sobre la que se tiene  
# registrada cierta información o características, en concreto las siguientes 
# 8 variables:
#
# rank: the ranking of the company,
# name: the name of the company,
# country: the country the company is situated in,
# category: a category describing the products the company produces,
# sales: the amount of sales of the company in billion US dollars,
# profits: the profit of the company in billion US dollars,
# assets: the assets of the company in billion US dollars,
# marketvalue: the market value of the company in billion US dollars.
# 
# Se puede obtener información algo más detallada sobre este data frame usando
# la ayuda. #

?Forbes2000

# R es un lenguaje de programación orientado a objetos, lo que significa que
# todo lo que utiliza son objetos, y que cualquier objeto es una instancia de
# una clase. El nombre de la clase de un objeto se puede obtener con el 
# siguiente comando. #

class(Forbes2000)

# La clase data.frame se usa para almacenar datos en el formato tradicional
# de tabla, como lo haríamos en una hoja de Excel, por ejemplo. Cada fila 
# corresponde con una observación y cada columna con una variable. 
#
# Podemos extraer las dimensiones de esta tabla con la función dim(). #

n <- dim(Forbes2000)[1]

# Alternativamente, podemos obtener el número de filas y de columnas usando
# respectivamente las funciones nrow() y ncol() #

nrow(Forbes2000)
ncol(Forbes2000)

# Es posible acceder a los nombres de las variables del data frame mediante 
# la función names() #

names(Forbes2000)

# Los valores de variables particulares pueden extraerse usando estos nombres. 
# Por ejemplo, podemos saber de qué clase es la variable que da el ranking de
# las compañías del siguiente modo. #

class(Forbes2000[,"rank"])

summary(Forbes2000$rank)



# Así vemos que esta variable rank es de tipo integer, esto es, entero.
#
# Es importante ver que los corchetes [] indican siempre un subconjunto de un
# objeto, como una única variable de la tabla completa. La coma dentro de los   
# corchetes es necesaria en tanto que los data frames tienen 2 dimensiones 
# (observaciones y variables), y en este caso estamos accediendo a la segunda.
#
# Extraigamos ahora en un nuevo objeto los rankings de todas las compañías. #

country

attach(Forbes2000)

country

rankings=Forbes2000[,"rank"]
class(rankings)

# De este modo, el objeto rankings es un vector de enteros. La longitud de este
# vector puede obtenerse con la funcion length(). #

length(rankings)

# Básicamente, un vector es un conjunto de objetos de la misma clase, y 
# constituye la estructura elemental para el manejo de datos en R.
# 
# Veamos diversas formas de crear vectores numéricos. #

1:100
c(1,3,5,3.5)
seq(from = 0, to = 300, by = 5)
x <- c(rep(1,3),rep(2,7),rep(3,6))
mean(x)

# También es posible trabajar con vectores cuyos elementos sean strings o 
# cadenas de texto. #

names=Forbes2000[,"name"]
class(names)
length(names)

# Podemos extraer el primer elemento de este vector como sigue. #

Forbes2000[,"name"][1]
names[1]

# Otra clase de interés en R es la clase Factor, que representa características
# de tipo carácter que, a diferencia de la clase Character, se repiten en 
# diferentes observaciones. La categoría de las compañías es una variable de esta
# clase. #

class(Forbes2000[,"category"])

# Además, los objetos de la clase factor se almacenan internamente asociando cada
# valor de tipo carácter con un valor numérico, el mismo para cada cadena de
# texto. A estos valores numéricos diferentes se los conoce como niveles. En este
# caso, la variable category tiene 27 niveles diferentes, que representan 
# diferentes categorías de negocio. #

nlevels(Forbes2000[,"category"])

# Estos niveles pueden extraerse usando la función levels(). #

levels(Forbes2000[,"category"])

n <- length(Forbes2000$rank)

levels(Forbes2000[,"category"]) <- c(levels(Forbes2000[,"category"]),"Sector Servicios")

# Es posible obtener un resumen estadístico de las frecuencias de estos niveles
# en el conjunto Forbes2000 usando la función table(). #

table(Forbes2000[,"category"])

Forbes2000[n+1,] <- c(1,"Nueva Empresa", "Spain","Sector Ser", 53,558,45,58)

# Las variables sales, assests, profit y market value son de tipo numérico, que 
# es la clase natural para mediciones continuas. #

class(Forbes2000[,"sales"])

Forbes2000$sales <- as.numeric(Forbes2000$sales)

# Para variables de este tipo es posible obtener estadísticos descriptivos 
# habituales como la media, la mediana o el rango. #

n <- dim(Forbes2000)[1]

median(Forbes2000[,"sales"])
mean(Forbes2000[,"sales"])
range(Forbes2000[,"sales"])
var(Forbes2000$sales)*(n-1)/n
sd(Forbes2000$sales)*sqrt((n-1)/n)
summary(Forbes2000$sales)
Q1 <- summary(Forbes2000$sales)[2]
library(e1071)
skewness(Forbes2000$sales)
kurtosis(Forbes2000$sales)

# Una función útil para obtener una primera impresión de la distribución de una
# variable numérica es la función summary(). #

summary(Forbes2000[,"sales"])

# Veamos ahora algunas nociones básicas sobre la manipulación de estas diferentes
# clases de objetos.
#
# Como hemos visto, los data frames proporcionan un tipo de objeto útil para
# almacenar datos de diferente naturaleza. Internamente, un data frame es una
# 'lista' de vectores con una longitud N común, el total de observaciones de la
# tabla. Cada uno de esos vectores es un conjunto de mediciones u observaciones
# de una misma característica y, por tanto, con el mismo tipo o clase.
#
# Por ejemplo, el vector 'names' creado anteriormente contiene los nombres de las
# 2000 compañias del conjunto de datos. Podemos acceder a un subconjunto de este
# vector usando corchetes []. #

names[1:3]

names[c(2,5,6,9)]

# También es posible indexar este subconjunto con números negativos. El efecto de
# estos es dejar fuera de la selección los correspondientes elementos. #

names[-(4:2000)]

# Podemos obtener la información de las variables numéricas de estas 3 compañías
# usando las dos dimensiones del data frame, separadas por coma (,) dentro de los 
# corchetes. #

Forbes2000[1:3, c("name", "sales", "profits", "assets")]

# Como vimos antes, podemos usar la segunda dimensión con corchetes para extraer
# una variable completa. Una manera algo más directa es usar el operador $. #

names=Forbes2000$name

# Esto es equivalente al comando names=Forbes2000[,"name"] usado mas arriba.
#
# Para obtener las mayores compañías en base a un orden diferente al original, 
# por ejemplo las 3 compañías con mayores ventas, usamos la función sort(). Esta 
# función devuelve los índices de los elementos ordenados del vector 'sales', 
# en orden creciente. #

orden_ventas=order(Forbes2000$sales)
orden_ventas[-(1:1997)]
orden_ventas[c(2000, 1999, 1998)]
Forbes2000[orden_ventas[c(2000, 1999, 1998)],
           c("name", "sales", "profits", "assets")]

# Podemos ordenar en orden decreciente usando un argumento extra en sort. #

orden_ventas=order(Forbes2000$sales, decreasing = TRUE)
orden_ventas[1:3]
Forbes2000[orden_ventas[1:3],
           c("name", "sales", "profits", "assets")]

# Otra manera de seleccionar elementos de un vector es mediante el uso de
# un vector de valores de tipo lógico (TRUE y FALSE), de manera que se 
# seleccionarán solo los elementos cuyo índice corresponda a un valor TRUE. #

Forbes2000[Forbes2000$assets > 1000,
           c("name", "sales", "profits", "assets")]

# Nótese que la expresión Forbes2000$assets > 1000 proporciona un vector lógico
# de longitud 2000, donde el elemento i-ésimo es TRUE si y solo si la compañía
# i-ésima de Forbes2000 tiene unos activos superiores a 10^12 US$. #

table(Forbes2000$assets > 1000)

# Un aspecto importante siempre que se tratan datos es la presencia de valores
# ausentes -también llamados perdidos- o missing. En R, los missing se tratan 
# mediante un símbolo especial, NA, indicando que la medición correspondiente
# no está disponible (Not Available). 
#
# La función is.na() permite comprobar si un determinado elemento es missing,
# o también obtener los elementos missing de un vector. #

na_profits=is.na(Forbes2000$profits)
table(na_profits)
Forbes2000[na_profits,
           c("name", "sales", "profits", "assets")]

na_sales=is.na(Forbes2000$sales)
table(na_sales)
Forbes2000[na_sales,
           c("name", "sales", "profits", "assets")]

na_names=is.na(Forbes2000$names)
table(na_names)
Forbes2000[na_names,
           c("name", "sales", "profits", "assets")]
is.na(Forbes2000)
table(is.na(Forbes2000))

# Esto es, la función is.na() devuelve TRUE para los elementos de un vector con
# valor NA.
#
# Una manera cómoda de eliminar todas las observaciones de un data frame
# con al menos una variable con valor NA es usando la función complete.cases().
# Esta función toma como argumento un data.frame y devuelve un vector lógico
# con valor TRUE para las observaciones sin ning?n valor missing. #

table(complete.cases(Forbes2000))

Forbes2000_sin_na <- Forbes2000[complete.cases(Forbes2000), c("rank","name","country", "category", "sales", "profits", "assets","marketvalue")]
table(complete.cases(Forbes2000_sin_na))
dim(Forbes2000_sin_na)

# Otra manera de seleccionar subconjuntos de un data frame es mediante la 
# función subset(), que puede a veces ahorrar escribir algo de código. #

UKcomp=subset(Forbes2000, country == "United Kingdom")
dim(UKcomp)

class(UKcomp)

# Centrémosnos ahora en algunas herramientas orientadas a obtener información de
# tipo descriptivo sobre objetos R. Como hemos visto anteriormente, la función
# summary() es útil para obtener una primera impresión sobre los datos de un 
# vector, aunque también es posible aplicarla a un data frame completo. #

summary(Forbes2000)

# Así, a través de la salida de esta función podemos ver que la mayoría de las 
# compañías están situadas en EEUU (US), y también que la mayoría de las compañías
# pertenecen al sector bancario. Asimismo, en la información mostrada podemos 
# observar que existen compañías con beneficios negativos, esto es, pérdidas, 
# de hasta 26 x 10^9 US$. 
#
# De hecho, es posible aplicar la función summary() a diferentes clases de 
# objetos R. En este sentido, esta función se puede denominar 'genérica', en el 
# sentido de que contiene métodos aplicables a diferentes clases de cara a 
# proporcionar resultados informativos. Aquí hemos suministrado un argumento de 
# tipo data frame a summary(), siendo natural aplicar esta función a cada una
# de las variables de ese data frame.  
#   
# En particular, como ya hemos comentado, un data frame es una lista, siendo los
# elementos de esta lista las variables (vectores) que contiene el data frame. 
# Para listas y objetos similares, es posible aplicar la función summary() del
# siguiente modo. #

lapply(Forbes2000, summary)

# Con esta función estamos aplicando la función summary a cada uno de los 
# elementos del dataframe.

# Esta función lapply() es un miembro de la familia de funciones 'apply'. Este 
# tipo de funciones facilitan el realizar tareas recurrentes en cada elemento
# de un data frame, una matriz, una lista, o para cada nivel de un factor.
#
# Por ejemplo, podr?amos comparar los beneficios de las compañías en cada una
# de las 27 categorías (sectores) contempladas en los datos del siguiente modo. #

mprofits <- tapply(Forbes2000$profits,Forbes2000$category, median, na.rm = TRUE)

# Este comando puede leerse como sigue: para cada nivel del factor 'category', 
# determinar los elementos correspondientes del vector numérico 'profits', y 
# suministrar estos a la función median() con el argumento adicional na.rm = TRUE.
# Este argumento es necesario en tanto 'profits' contiene valores missing, que 
# conducir?an a un resultado no informativo de la función median(). 
# Indica simplemente que los valores NA se deben ignorar.

median(Forbes2000$profits)

median(Forbes2000$profits, na.rm =T)

# Del mimo modo, podemos obtener las medias para los beneficios de los distintos paises.

tapply(Forbes2000$profit, Forbes2000$country, mean, na.rm = TRUE)

# A partir de los resultados de tapply(), podemos obtener los tres sectores
# con mayor beneficio mediano, usando la función sort() e invirtiendo la
# ordenaci?n (función rev()). #

rev(sort(mprofits))[1:3]
sort(mprofits)[1:3]
sort(mprofits, decreasing = TRUE)[1:3]

# Por supuesto, es posible reemplazar la función median() por mean() o por 
# cualquier otra función apropiada en la llamada a mapply(). Sin embargo, en este
# caso la media mean() no es una buena elección (¿por qué?). 

# Aparte de una medida de localización o centralización como la mediana, para
# describir numéricamente la distribución de una variable numérica normalmente 
# es necesario obtener también alguna medida de dispersión que informe de su
# variabilidad. Una medida de dispersión robusta viene dada por el rango 
# intercuartílico, esto es, la diferencia entre el tercer y primer cuartil 
# de los datos. Esta medida de dispersión se puede computar mediante la 
# función IQR(). Apliquémosla a los beneficios 'profits' por categorías. #

tapply(Forbes2000$profits, Forbes2000$category, IQR, na.rm=TRUE)

# Aunque esto resuelve la cuestión descriptiva que nos ocupaba, vamos a aprovechar
# este tema para ilustrar algunas posibilidades de R. Para ello, en primer lugar 
# vamos a construir una función propia que replique el funcionamiento de esta 
# función IQR().
#
# En R, una función es un objeto, y todos los objetos se crean del mismo modo. 
# Por tanto, tenemos que asignar un objeto función a una variable. Un objeto
# función consiste en una lista de argumentos, que define los parámetros de la
# función y posiblemente sus valores por defecto, y un cuerpo que define las 
# tareas que la función lleva a cabo. El comienzo y el final del cuerpo de la 
# función se indica mediante llaves {}. Además, en la mayoría de casos una función
# ha de retornar algún valor, por lo que el cuerpo ha de contener uno o más 
# comandos 'return()'. 
# 
# Volviendo a nuestro ejemplo, llamaremos a nuestra función 'iqr' (nótese que R
# es sensible a diferencias entre minúsculas y mayúsculas). Esta función iqr ha de
# operar sobre un vector numérico, por tanto ha de tener un argumento, que 
# denotaremos como x. Este vector será enviado a la función quantile() para
# obtener los cuartiles que necesitamos. La diferencia entre ellos será entonces
# computada mediante la función diff(). La definición de esta función iqr es
# entonces la siguiente. #

iqr = function(x) {
  q = quantile(x,prob=c(0.25,0.75), names=FALSE)
  return(diff(q))
}

# Testeemos el funcionamiento de esta función sobre datos simulados de una 
# distribución normal estándar N(0,1), comparando su resultado con el de la
# función original IQR(). #

simdata=rnorm(100)
iqr(simdata)
IQR(simdata)

# así pues, a primera vista parece que nuestra función iqr reproduce adecuadamente
# el resultado de la función nativa IQR. Sin embargo, si el vector x contiene
# algún dato missing nuestra función fallaría. #

simdata[1]=NA
iqr(simdata)

# Para hacer nuestra función iqr más flexible, podríamos usar los mismos 
# argumentos que utiliza la función quantile(), entre ellos na.rm que, como hemos
# visto, permite quitar los valores missing antes de realizar alguna operación,
# como obtener los cuartiles. Aunque esta opción funcionaría, es más flexible y 
# adecuado de cara a evitar posibles errores e inconsistencias (por ejemplo si
# se modifica la función quantile() en versiones posteriores de R) usar un
# argumento 'comodín', dado por puntos suspensivos, esto es ... #

iqr = function(x, ...) {
  q = quantile(x,prob=c(0.25,0.75), names=FALSE, ...)
  return(diff(q))
}

iqr(simdata, na.rm=TRUE)
IQR(simdata, na.rm=TRUE)

# Una vez tenemos terminada nuestra función iqr, es importante ver que podemos
# usarla exactamente igual que cualquier función nativa de R. Esto es, el lenguaje
# no diferencia entre las funciones escritas por los desarrolladores de R y por
# los usuarios. Por ejemplo, podemos usar nuestra función iqr en lugar de 
# IQR en conjunción con la función tapply() para calcular las desviaciones 
# intercuartílicas por categorías. #

iqr_profits=tapply(Forbes2000$profits, Forbes2000$category, iqr, na.rm=TRUE)

# así, los sectores con la menor y mayor variabilidad en sus beneficios son los
# siguientes. #

levels(Forbes2000$category)[which.min(iqr_profits)]
levels(Forbes2000$category)[which.max(iqr_profits)]

# Aparte de los descriptores numéricos como medias, medianas, varianzas o rangos
# intercuartílicos, la herramienta fundamental para el análisis descriptivo de 
# una distribución de datos son las representaciones gráficas.
# 
# Un gráfico básico que permite obtener una primera aproximación a la forma de 
# la distribución de una variable estadística continua es el histograma. El  
# siguiente código produce el histograma de la variable 'profits' y de su 
# logaritmo. #

layout(matrix(1:2, nrow = 2))  # Dividimos el espacio para gráficos en 2.
hist(Forbes2000$profits)
hist(log(Forbes2000$profits))

# Vemos como la distribución de profits presenta una agrupación una gran mayoría 
# de compañías en una franja de beneficios entre -5 y 5 x 10^9 US$, aunque 
# algunas pocas compañías tienen beneficios mucho más extremos. La distribución 
# de su logaritmo tiene en cambio una forma más equilibrada, y en particular más
# similar a una campana normal.
#
# Este tipo de distribución asimétrica y con datos extremos se puede quizás 
# observar mejor en la variable 'marketvalue' a través del correspondiente 
# histograma. #

layout(matrix(1:2, nrow = 2))
hist(Forbes2000$marketvalue)
hist(log(Forbes2000$marketvalue))

# El gráfico apropiado para estudiar la relación entre dos variables numéricas es
# el llamado diagrama de dispersión (scatterplot). Este tipo de relaciones entre
# variables numéricas se suelen conocer como 'de regresi?n'. En R, este tipo
# de relación de regresión se especifica mediante una 'fórmula de modelo', que en 
# el caso más sencillo en el que solo intervienen dos variables presenta la 
# siguiente forma. #

fm=marketvalue~sales
class(fm)

# En esta expresión, la variable dependiente está en el término de la izquierda,
# mientras que la variable independiente queda en la derecha. La tilde ~ separa
# ambos términos. Este tipo de fórmulas se pueden suministrar a diferentes
# funciones de R que construyen modelos estad?sticos, como veremos en temas
# posteriores.
#
# Por ahora, nos quedamos con que estas expresiones de tipo fórmula pueden 
# usarse para construir diagramas de dispersión a través de la función plot(). #

layout(matrix(1:1, nrow = 1))
plot(fm,data=Forbes2000, pch=".")

# En tanto las variables 'marketvalue' y 'sales' son fuertemente asim?tricas,
# es más ilustrativo graficar sus logaritmos. #

plot(log(marketvalue) ~ log(sales), data = Forbes2000, pch = ".")

# Una representación que permite calibrar mejor la acumulación de puntos en las
# zonas de mayor densidad se consigue seleccionando un color más transparente
# para los puntos graficados. #

plot(log(marketvalue) ~ log(sales), data = Forbes2000,
     col = rgb(0,0,0,0.1), pch = 16)

# Cuando la variable independiente o explicativa es un factor (esto es, una 
# variable categórica en vez de numérica), la representación gráfica más adecuada
# es el llamado diagrama de cajas (boxplot). El siguiente código genera un
# diagrama de cajas de la variable 'marketvalue' para un conjunto de 4 pa?ses. #

tmp=subset(Forbes2000, country %in%
             c("United Kingdom","Germany", "India", "Turkey"))
tmp$country=tmp$country[,drop=TRUE]
boxplot(log(marketvalue) ~ country, data = tmp,
        ylab = "log(marketvalue)", varwidth = TRUE)

# La primera sentencia del grupo anterior selecciona los datos que queremos
# comparar, esto es, los de los países indicados. Sin embargo, en el data frame 
# resultante la variable 'country' sigue siendo un factor con 61 niveles (muchos 
# con frecuencia 0), no solamente con los 4 indicados. Para lograr esto y que en 
# el gráfico de cajas no aparezcan en el eje horizontal todos estos 61 países, 
# es necesaria la sentencia de la segunda línea, que mediante la opción drop=TRUE
# elimina los niveles que no presentan observaciones.