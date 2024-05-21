# Ejemplo de graficos y medidas de dispersión, analsis descriptivo, para datos Salarios.txt
# ------------------------------------------------------------------------------------

#Esta línea de código permite al usuario seleccionar un archivo de datos mediante una interfaz gráfica y lo lee en un objeto llamado datos. 
datos <- read.table(file.choose(), header = TRUE)
#La función attach() adjunta el conjunto de datos Salarios, lo que permite que las columnas del conjunto de datos se utilicen directamente por sus nombres.
attach(Salarios)
#Esta línea muestra los nombres de las variables en el conjunto de datos Salarios.
names(Salarios)

# Gráfico de sectores
# -------------------
#Esta línea crea un gráfico de sectores que muestra la distribución de la variable Cat_Prof en el conjunto de datos.
pie(table(Cat_Prof))

#Estas líneas calculan las frecuencias relativas de la variable Cat_Prof, las almacenan en un nuevo marco de datos llamado distrfreq y luego crean un gráfico de sectores con etiquetas que muestran las categorías y sus porcentajes.
distrfreq <- as.data.frame(table(Cat_Prof))
names(distrfreq) <- c("xi","ni")
distrfreq$fi <-round(distrfreq$ni/sum(distrfreq$ni)*100,2)
distrfreq
pie(table(Cat_Prof), labels = paste0(distrfreq$xi," ",distrfreq$fi, "%"),
    col = c("red", "orange", "blue", "yellow", "green"))


# Gráfico de barras
# -----------------
#Esta línea crea un gráfico de barras que muestra la distribución de la variable Cat_Prof en el conjunto de datos.
barplot(table(Cat_Prof), col="blue")

TablaFrecRel <- table(Cat_Prof)
TablaFrecRel <- TablaFrecRel/sum(TablaFrecRel)

barplot(TablaFrecRel, col="blue")

# Histograma
# ----------
#Estas líneas crean un histograma que muestra la distribución de la variable Sal_cat en el conjunto de datos, donde Sal_cat probablemente represente los salarios de los empleados.
hist(as.numeric(Sal_cat), xlab = "Salarios Empleados")

hist(as.numeric(Sal_cat), col = "red",xlab = "Salarios Empleados", freq = FALSE, main = "Histograma")

# Poligono de frecuencias
# -----------------------

# Haremos un histograma en 10 intervalos:

Re = (max(Sal_cat)+0.001)- (min(Sal_cat)-0.001)
Amplitud = Re/10
i <- min(Sal_cat)-0.001
cuts <- i

while (i < max(Sal_cat)){
  i <- i + Amplitud
  cuts <- c(cuts,i)
}
cuts

hist(Sal_cat, breaks=cuts, col="cyan",xlab = "Salarios", main = "Histograma" )

# Ahora calcularemos las marcas de clase y las pintaremos sobre el histograma

Li <- cuts[-1]
Li_1 <- cuts[-length(cuts)]

MC <- (Li+Li_1)/2

x <- c(min(Sal_cat), MC, max(Sal_cat))
y <- c(0,as.numeric(table(cut(Sal_cat, breaks=cuts, right=TRUE))),0)

lines(x,y, lwd = 3, col ="blue" )

# Y con las frecuencias acumuladas
# --------------------------------

y <- c(0,cumsum(as.numeric(table(cut(Sal_cat, breaks=cuts, right=FALSE)))),0)
plot(x,y, lwd=3, pch = 20, col ="red" )
lines(x,y, lwd=3, col="red")

# Diagrama de cajas

boxplot(as.numeric(Sal_cat), main = "Salarios de los empleados", horizontal = TRUE, col = "cyan")

# ------------------------------------------------------------------------------------
# Medidas de posición central
# ------------------------------------------------------------------------------------
#Las partes restantes del código realizan análisis estadísticos adicionales, como la construcción 
#de un polígono de frecuencias, diagrama de cajas, cálculo de medidas de posición central 
#(media, cuartiles), y medidas de dispersión (varianza, desviación estándar y coeficiente de variación). 
xi <- c(300, 600, 900, 1200, 1500)
ni <- c(20, 40, 60, 50, 30)

TablaFrecuencias <- as.data.frame(cbind(xi, ni))
n <- sum(TablaFrecuencias$ni)
TablaFrecuencias$xini <- TablaFrecuencias$xi * TablaFrecuencias$ni
TablaFrecuencias
Media <- sum(TablaFrecuencias$xini)/n
Media

# Percentiles

# Q1 

Q1=(1/4)*n
Q1

# Para buscar la posición necesitamos las frecuencias acumuladas:

TablaFrecuencias$Ni <- cumsum(TablaFrecuencias$ni)
TablaFrecuencias

# Solución 600

# Q3

Q3=(3/4)*n
Q3

# Solución 1200

# ------------------------------------------------------------------------------------
# Medidas de dispersión
# ------------------------------------------------------------------------------------

TablaFrecuencias$DesvMed2 <- (TablaFrecuencias$xi - Media)^2*TablaFrecuencias$ni
TablaFrecuencias
Varianza <- sum(TablaFrecuencias$DesvMed2)/n
Varianza

S <-sqrt(Varianza)
S

V <- S/Media
V

