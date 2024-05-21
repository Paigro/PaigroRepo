#Este código de R realiza un análisis estadístico de REGRESIÓN LINEAL SIMPLE utilizando el conjunto 
#de datos integrado cars, que contiene información sobre la velocidad de los autos y la distancia 
#que recorren para detenerse (datos integrados en RStudio).

#IMPORTANTE: No se espera que conozcas todos los test que se mencionan
# el objetivo principal es que te familiarices con el codigo estadistico de R y que interpretes 
# los resultados que conozcas, en la salida del software (Console).

#Muestra la documentación para el conjunto de datos cars, que describe sus características y su propósito.
?cars
#Esta función probablemente intenta abrir una ventana de visualización para ver los datos
view(cars)

#Se asigna el conjunto de datos cars a un nuevo objeto llamado mydata.
mydata <- cars
#Muestra las primeras 10 filas del conjunto de datos mydata.
head(mydata, n=10)
#Muestra las últimas 10 filas del conjunto de datos mydata.
tail(mydata, n=10)

#Adjunta el conjunto de datos mydata, lo que significa que los nombres de las columnas 
#se pueden usar directamente sin especificar el nombre del conjunto de datos.
attach(mydata)
#Muestra los nombres de las columnas del conjunto de datos mydata.
names(mydata)

#Grafica la relación entre la velocidad y la distancia, con la velocidad en el eje x y la distancia 
#en el eje y. Usa puntos rojos (pch=20) y etiqueta el eje y como "Distancia".
plot(speed, dist, col="red", pch=20, ylab = "Distance")
#Calcula el coeficiente de correlación de Pearson entre la velocidad y la distancia.
cor(speed, dist, method="pearson")
#Calcula el coeficiente de correlación de Spearman entre la velocidad y la distancia.
cor(speed, dist, method = "spearman")

#Ajusta un modelo de regresión lineal donde la distancia es predicha por la velocidad.
model_cars <- lm(dist ~ speed, data = mydata)
#Muestra un resumen del modelo de regresión lineal ajustado, que incluye coeficientes, estadísticas de ajuste y significancia.
summary(model_cars)
#Realiza un análisis de varianza (ANOVA) para el modelo de regresión lineal.
anova(model_cars)

#grafico
plot(speed, dist, col="red", pch=20, ylab = "Distance")
#Agrega la línea de regresión al gráfico de dispersión anterior, usando los coeficientes del modelo ajustado.
abline(model_cars$coef, col="blue")

#Divide la ventana gráfica en una cuadrícula de 2x2 para los siguientes gráficos.
par(mfrow=c(2,2))
#Muestra varios gráficos de diagnóstico para el modelo de regresión lineal.
plot(model_cars)

#Restablece la configuración de la ventana gráfica a una sola ventana.
par(mfrow=c(1,1))

#Calcula los residuos del modelo de regresión lineal y los almacena en resi_1.
resi_1 <- residuals(model_cars); resi_1
#Realiza el test de Shapiro-Wilk para verificar la normalidad de los residuos.
shapiro.test(resi_1)
#Grafica un histograma de los residuos con color "salmon".
hist(resi_1, col = "salmon")

#Instala el paquete "nortest" si no está instalado.
install.packages("nortest")
#Carga el paquete "nortest" para usar sus funciones.
library(nortest)
#Realiza el test de Cramer-von Mises para verificar la normalidad de los residuos.
cvm.test(resi_1)

#Instala el paquete "car" si no está instalado.
install.packages("car")
#Hay un error tipográfico aquí, debería ser library(car), carga el paquete "car" para usar sus funciones.
library(car)
#Grafica un gráfico cuantil-cuantil (QQ plot) de los residuos para verificar su normalidad.
qqPlot(resi_1)

#Realiza el test de Breusch-Pagan para verificar la homocedasticidad de los residuos.
ncvTest(model_cars)

#Grafica un gráfico de dispersión de los residuos frente a los valores ajustados para verificar la homocedasticidad.
par(mfrow=c(1,1))
spreadLevelPlot(model.cars)

#Calcula intervalos de confianza del 95% para los coeficientes del modelo de regresión lineal.
confint(model.cars, level=0.95)

#Crea un nuevo conjunto de datos con una velocidad de 21.
new.data <- data.frame(speed = 21); new.data

#Predice la distancia correspondiente a una velocidad de 21 mph con un intervalo de confianza.
predict(model.cars, new.data, interval = "confidence")

#Predice la distancia correspondiente a una velocidad de 21 mph con un intervalo de predicción.
predict(model.cars, new.data, interval = "prediction")

