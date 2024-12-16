#include "Program.h"

#include <fstream>


Program::Program()
{
	read();
}

Program::~Program()
{

}

bool Program::update()
{
	switch (toupper(keyPressed()))
	{
	case 'A':
		std::cout << "//--P: anyadir libro." << std::endl;
		addBook();
		break;
	case 'B':
		std::cout << "//--P: jeje." << std::endl;
		buenosDias();
		break;
	case 'E':
		std::cout << "//--P: editar libro." << std::endl;
		editBook();
		break;
	case 'D':
		std::cout << "//--P: eliminar libro." << std::endl;
		deleteBook();
		break;
	case 'H':
		std::cout << "//--P: ayuda." << std::endl;
		help();
		break;
	case 'X':
		std::cout << "//--P: saliendo." << std::endl;
		write();
		return false;
	case ' ':
		std::cout << "//----E: tecla no valida." << std::endl;
		break;
	default:
		std::cout << "//----E: tecla no resgistrada. " << std::endl;
		break;
	}
	return true;
}

char Program::keyPressed()
{
	std::cout << "//--P: pulse tecla:" << std::endl;

	std::string key;
	std::cin >> key;
	if (!std::cin || key.size() >= 2)
	{
		return ' ';
	}
	return key[0];
}

void Program::addBook()
{
	DataLibro* newLibro = new DataLibro();
	std::string texto;
	int day;
	int month;
	int year;
	bool sigPaso = false;


	std::cout << "//--P--A: introduzca fecha de inicio de lectura:?" << std::endl;
	while (!sigPaso)
	{
		std::cout << "//--P--A: anyo?" << std::endl;
		std::cin >> year;
		if (year > 2004) { sigPaso = !sigPaso; }
		else { std::cout << "//--P--A: anyo incorrecto" << std::endl; }
	}
	sigPaso = !sigPaso;
	while (!sigPaso)
	{
		std::cout << "//--P--A: mes?" << std::endl;
		std::cin >> month;
		if (month > 0 && month <= 12) { sigPaso = !sigPaso; }
		else { std::cout << "//--P--A: mes incorrecto" << std::endl; }
	}
	sigPaso = !sigPaso;
	while (!sigPaso) {
		std::cout << "//--P--A: dia?" << std::endl;
		std::cin >> day;

		switch (month) {
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			if (day >= 1 && day <= 31) { sigPaso = true; }
			else { std::cout << "//--P--A--E: dia incorrecto" << std::endl; }
			break;
		case 4: case 6: case 9: case 11:
			if (day >= 1 && day <= 30) { sigPaso = true; }
			else { std::cout << "//--P--A--E: dia incorrecto" << std::endl; }
			break;
		case 2:
			if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
				if (day >= 1 && day <= 29) { sigPaso = true; }
				else { std::cout << "//--P--A--E: dia incorrecto" << std::endl; }
			}
			else {
				if (day >= 1 && day <= 28) { sigPaso = true; }
				else { std::cout << "//--P--A--E: dia incorrecto" << std::endl; }
			}
			break;
		default:
			std::cout << "//--P--A: dia incorrecto" << std::endl;
			break;
		}
	}
	sigPaso = !sigPaso;
	newLibro->setStartDate(day, month, year);

	std::cout << "//----A: funcionalidad en proceso." << std::endl;
}

void Program::buenosDias()
{
	std::cout << "//----A: funcionalidad no implementada." << std::endl;
	// TO DO
}

void Program::help()
{
	std::cout << "//----P--H: Teclas:" << std::endl <<
		" *A: anyadir libro." << std::endl <<
		" *B: sorpresa." << std::endl <<
		" *C: recuperar el archivo guardado." << std::endl <<
		" *E: editar libro." << std::endl <<
		" *D: eliminar libro." << std::endl <<
		" *S: guardar." << std::endl <<
		" *X: salir." << std::endl;







	std::cout << "//----A: funcionalidad en proceso." << std::endl;
	// TO DO
}

void Program::deleteBook()
{
	std::cout << "//----A: funcionalidad no implementada." << std::endl;
	// TO DO
}

void Program::editBook()
{
	// TO DO
	std::cout << "//----A: funcionalidad no implementada." << std::endl;
}

void Program::read()
{
	std::ifstream file;


	file.open("files/bank.txt");

	/*int number, iterations;

	file >> currentMoney >> currentCase >> currentSouls >> iterations;

	for (int i = 0; i < iterations; i++)
	{
		file >> number;
		maze.push_back(number);
	}

	file >> iterations;
	for (int i = 0; i < iterations; i++)
	{
		file >> number;
		drawer.push_back(number);
	}

	file >> iterations;
	for (int i = 0; i < iterations; i++)
	{
		file >> number;
		defeatedNPCS.push_back(number);
	}*/

	file.close();
}

void Program::write()
{
	std::ofstream file;

	file.open("files/bank.txt");

	for (auto l : vLibros)
	{
		file << l->getStartDate().day << " " << l->getStartDate().month << " " << l->getStartDate().year << std::endl;
		file << l->getBook().code << std::endl;
		file << l->getBook().title << std::endl;
		file << l->getBook().code << std::endl;
		file << l->getEndDate().day << " " << l->getEndDate().month << " " << l->getEndDate().year << std::endl;
		file << std::endl;
	}



	file.close();
}