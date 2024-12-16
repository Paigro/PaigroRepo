#pragma once

#include <iostream>

#include "Libro.h"
#include "Fecha.h"


class DataLibro
{
private:

	Fecha startDate;
	Fecha endDate;
	Libro book;

public:

	//------Constructoras y destructoras:

	// Constructora de DataLibro.
	DataLibro();
	// Destructora de DataLibro.
	~DataLibro();


	//------Getters y setters:

	// Gettea la fecha de inicio de lectura.
	const Fecha getStartDate() { return startDate; };
	// Gettea la fecha de fin de lectura.
	const Fecha getEndDate() { return endDate; };
	// Gettea el libro.
	const Libro getBook() { return book; };
	// Settea la fecha de inicio de lectura.
	void setStartDate(int d, int m, int y);
	// Settea la fecha de fin de lectura.
	void setEndDate(int d, int m, int y);
	// Setttea el libro con titulo y autor.
	void setBook(std::string t, std::string a);
};