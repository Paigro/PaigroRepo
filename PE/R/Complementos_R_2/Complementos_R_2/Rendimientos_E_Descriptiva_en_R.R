# IMPORTANTE: Te tienes que apoyar en presentaciones de estadistica descriptiva

# ------------------------------------------------------------------------------------------
# Ejercicio 1. Rendimientos
# ------------------------------------------------------------------------------------------
# 1a.

Rendimientos <- c(-2.5, 0.6, -0.1, -1.2, -2.5, 1.7, 0.6, -1.7, 0.9, -3.9, 0.6, 1.7, 0.0, 2.3, 0.6,
                  2.8, 1.2, 0.9, 1.7, 0.6, -1.7, 0.6, -0.9, -3.6, -1.7)
n <- length(Rendimientos)

# Distribución de frecuencias en intervalos Iguales

xini<- as.data.frame(table(Rendimientos))
xini

# Obtendremos las frecuencias acumuladas utilizando la función cumsum, del siguiente modo:
Ni <- cumsum(xini[,2])
Ni

# La siguiente columna tendrá las frecuencias relativas (fi), que calcularemos dividiendo las frecuencias entre el tamaño muestral:
fi <- xini[,2]/n
fi

# Finalmente, las frecuencias relativas acumuladas (Fi) se obtienen utilizando de nuevo la función cumsum, ahora para sumar las frecuencias relativas: q

Fi <- cumsum(fi)

# Una vez que tenemos todas las columnas que forman la distribución de frecuencias, las juntamos en una única tabla haciendo uso de la función cbind:

TablaFrecuencia <-cbind (xini, Ni, fi, Fi)
TablaFrecuencia

# Y para terminar cambiaremos los nombres de la columnas por medio de la función colnames:

colnames(TablaFrecuencia) <- c("xi", "ni", "Ni", "fi", "Fi")
TablaFrecuencia

# 1b.

# Primero definimos los intervalos:

Cuts <- c(-4, -3, -2, -1, 0, 1, 2, 3)

# Otra forma:

cuts <- -4

for (i in -3:3){
  cuts <- c(cuts,i)
}
cuts

# O más fácil

cuts <- -4:3
cuts

# Una vez definidos los intervalos podemos obtener la distribución de frecuencias

TablaFrecAgrupada<- as.data.frame(table(cut(Rendimientos, breaks=cuts, right=TRUE)))
colnames(TablaFrecAgrupada) <- c("Li_1_Li", "ni")
TablaFrecAgrupada

# Y la marca de clase

Li <- cuts[-1] # Los límites superiores son los límites creados menos el primero
Li_1 <- cuts[-length(cuts)] # Los límites inferiores son los límites creados menos el último

TablaFrecAgrupada$MC <- (Li+Li_1)/2
TablaFrecAgrupada

TablaFrecAgrupada <- TablaFrecAgrupada[ , c(1,3,2)]
TablaFrecAgrupada

# Y el resto de componentes de la distribución de frecuencias se obtienen como antes

TablaFrecAgrupada$Ni <- cumsum(TablaFrecAgrupada$ni)
TablaFrecAgrupada$fi <- TablaFrecAgrupada$ni/n
TablaFrecAgrupada$Fi <- cumsum(TablaFrecAgrupada$fi)
TablaFrecAgrupada

