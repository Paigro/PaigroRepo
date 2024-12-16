#include <iostream>
#include <fstream>
#include <string>

#include "Program.h"


Program* prog = nullptr;

void init()
{
	std::cout << "/Start init/\n" << std::endl;

	prog = new Program();
	std::cout << "------BUENOS DIAS------" << std::endl;

	std::cout << "\n/End init/\n" << std::endl;
}

void close()
{
	std::cout << "/Start close/\n" << std::endl;

	delete prog;
	std::cout << "------BUENOS NOCHES------" << std::endl;

	std::cout << "\n/End close/\n" << std::endl;
}

int main()
{
	init();

	while (prog->update()) {};

	close();
}