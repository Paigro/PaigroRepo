#pragma once

#include <iostream>
#include <vector>

#include "DataLibro.h"


class Program
{
private:

	std::vector<DataLibro*> vLibros;

public:
	//------Constructoras y destructoras:

	// Constructora de Program.
	Program();
	// Destructora de Program.
	~Program();


	//------Metodos de Program:

	// Update de Program.
	bool update();
	//
	char keyPressed();
	//
	DataLibro searchBook();
	

	//------Metodos de libros:

	// Anyadir libro.
	void addBook();
	// Buenos días.
	void buenosDias();
	// Help.
	void help();
	// Elimina un libro.
	void deleteBook();
	// Edita un libro.
	void editBook();


	//------Metodos de ficheros:

	// Leer el archivo.
	void read();
	// Escribe el archivo.
	void write();
};