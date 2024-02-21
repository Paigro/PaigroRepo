
#include <iostream>
#include <list>
#include "Data.h"

int main()
{
	list<int> testList;
	
	Data data;
	Data data2(10000, 1, 1000, testList, testList, testList);

	data2.AddCardToMaze(2345);
	data2.AddCardToMaze(6666);

	data.AddCardToMaze(2435);

	data2.Write();
	data.Read();

	std::cout << "Carta en cajon: " << data.IdIsInMaze(2345) << std::endl;
	data.SubtractCardFromMaze(2345);
	std::cout << "Carta en cajon: " << data.IdIsInMaze(2345) << std::endl;
	std::cout << "Dinero: " << data.GetMoney() << std::endl;
	std::cout << "Almas: " << data.GetSouls() << std::endl;
}
