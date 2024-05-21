# Aprender a importar datos de excel a R
# ------------------------------------------------
# 1. Que necesitas antes de empezar
# 2. Cómo importar datos utilizando código de R
# 3. Cómo importar datos con la interfaz de RStudio
#####################################
# 1. Que necesitas antes de empezar #
#####################################

# instalar paquete readxl
install.packages("readxl")

# cargar paquete readxl
library(readxl)

# buscar la ruta del archivo de excel
# se abre ventana para buscar archivo.
file.choose()

# Copiar ruta de la consola y guardar en variable ruta_excel.
ruta_excel <- "C:\\Users\\34622\\Desktop\\CLASE_R_VIDEOJUEGOS\\gapminder_importar_a_r.xlsx"

# como mirar las hojas de tu excel
excel_sheets(ruta_excel)

#####################################
# 2. importar excel con código de R #
#####################################

# importar caso ideal #para un libro de excel en que los datos estan contenidos en la hoja 1 y comienzan en A1
caso_ideal <- read_excel(ruta_excel)

View(caso_ideal) #Muestra hoja 1 de un libro excel

# importar caso medio. Carga hoja 2 de un libro excel
caso_medio <- read_excel(ruta_excel,
                         sheet = 'Hoja2') 

# importar caso dificil. para cargar datos en un rango de hoja de excel
final_boss <- read_excel(ruta_excel,
                         sheet = 'Hoja3',
                         range = 'C7:F17') 

##########################################
# 3. importar excel con interfaz RStudio #
##########################################

# ir a File > Import Dataset > From Excel...
#se abrira ventana para importar los datos, fijate que veras en la ventana el mismo codigo R en la parte inferior derecha.
