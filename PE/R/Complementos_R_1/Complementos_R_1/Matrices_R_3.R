
#####################################
# creando matrices en R #
#####################################

# crear vectores para las columnas de la matriz
X <- c(20,20,16,17,17,22,17,18,19)
Y <- c(11,13,11,8,12,11,12,8,10)
Z <- c(18,15,15,15,16,17,15,13,11)

# creando matriz a partir de vectores
la_matrix <- matrix(c(X,Y,Z),
                    nrow = 9,
                    ncol = 3)

# imprimir matriz en consola
la_matrix

# agregar nombres de columnas
colnames(la_matrix) <- c("X", "Y", "Z")

# agregar nombres de filas/renglones
rownames(la_matrix) <- c("1", "2", "3", "4", "5", "6", "7", "8", "9")

# imprimir matriz por segunda vez
la_matrix

####################################################
# práctica 2: operaciones aritméticas con matrices #
####################################################

# resta 5 a la matriz
la_matrix - 5

# sumar matriz consigo misma
la_matrix + la_matrix

# multiplicar la matriz consigo mismo
la_matrix * la_matrix

###################################################
# práctica 3: selección de elementos de un matriz #
###################################################

# seleccionar un elemento de la matriz
la_matrix[3,2]


# seleccionar más de un elemento de la matriz
la_matrix[c(3,4), c(2,3)]


# seleccionar una fila o renglón
la_matrix[3,]


# seleccionar una columna
la_matrix[,2]
