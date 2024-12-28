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
	

protected:

	int day; // Dia de la fecha.
	int month; // Mes de la fecha.
	int year; // Anyo de la fecha.

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

	// Operador ++. Va sumando dias haciendo los cambios necesarios entre meses y anyos.
	void operator++();
	// Operador --. Va restando dias haciendo los cambios necesarios entre meses y anyos.
	void operator--();
	// Operador ==.
	bool operator==(const Date& other) const;
	// Operador !=.
	bool operator!=(const Date& other) const;


	//------Getters y setters:

	// Devuelve el dia de la fecha.
	int getDay() const { return day; }
	// Devuelve el mes de la fecha.
	int getMonth() const { return month; }
	// Devuelve el anyo de la fecha.
	int getYear() const { return year; }
	// Devuelve el numero de dias del mes dado el mes y el anyo.
	static int getDaysInMonth(int month, int year);
};