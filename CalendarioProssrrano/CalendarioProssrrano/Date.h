#pragma once

#include <iostream>
#include <string>
#include <array>

class Date
{
private:

	// Dias de cada mes en un anyo no bisiesto.
	static constexpr std::array<int, 12> daysInMonth = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 }; 


	//------Metodos de Date:

	// Devuelve si el anyo es bisiesto.
	static bool isBisiesto(int year);
	// Devuelve el numero de dias del mes
	static int daysInMonthFor(int month, int year);

protected:

	int day; // Dia.
	int month; // Mes.
	int year; // Anyo.

public:

	//------Constructoras y destructoras:

	// Constructora base de Date. Pone todo a -1.
	Date();
	// Constructora con parametros de Date.
	Date(int d, int m, int y);
	// Destructora de Date.
	~Date();


	// Devuelve si la fecha es correcta o no de acuerdo al calendario Gregoriano.
	bool isCorrect() const;


	//------Operadores:

	// Operador ++.
	void operator++();
	// Operador --.
	void operator--();
	// Operador ==.
	bool operator==(const Date& other) const;
	// Operador !=.

	bool operator!=(const Date& other) const;


	//------Diferencia entre fechas:

	// Diferencia en dias entre dos fechas.
	static int dateDifference(const Date& a, const Date& b);


	//------Getters y setters:

	// Devuelve el dia de la fecha.
	int getDay() { return day; }
	// Devuelve el mes de la fecha.
	int getMonth() { return month; }
	// Devuelve el anyo de la fecha.
	int getYear() { return year; }
};