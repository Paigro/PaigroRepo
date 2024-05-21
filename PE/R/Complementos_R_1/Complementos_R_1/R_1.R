# Objetivo: estudiar qué es una variable en R.
# ---------------
# En este ejercicio vamos a:
# 1. Realizar operaciones aritméticas en la consola
# 2. Asignar variables a un script en RStudio, y 
# 3. Identificar distintos tipos de datos en R

#######################################
# Operaciones aritmeticas #
#######################################

# Calculadora
1+1-1*(1+1-1)/1+1


#######################################
# Asignación de variables #
#######################################

# asigna los numeros a X Y Z

X <- 10
Y <- 20
Z <- 30
# resuelve 
resultado <- 2*X + 4*Y +1.5*Z

# imprime el resultado por pantalla
resultado

##################################
# Tipos de variables #
##################################

# crea una variable con algún nombre
nombre <- "Luis"


# observa la clase del nombre
class(nombre)


# es 1 mayor que 2
1 > 2

# cual es la clase de esto
class(1<2)

# suma nombre con resultado
nombre + resultado

