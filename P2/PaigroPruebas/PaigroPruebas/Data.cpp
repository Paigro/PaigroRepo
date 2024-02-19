#include "Data.h"




//------Constructora y destructora:
Data::Data() {}
Data::Data(int mon, int cas, int sou, list<int>maz, list<int>dra, list<int>def)
	:currentMoney(mon), currentSouls(sou), currentCase(cas), maze(maz), drawer(dra), defeatedNPCS(def)
{};
Data::~Data() {};
//------Setters:
//----Mazo:
void Data::AddCardToMaze(int id) {
	maze.push_back(id);
	sizemaze++;
}
void Data::SubtractCardFromMaze(int id) {
	maze.remove(id);
	sizemaze--;
}
//----Cajon:
void Data::AddCardToDrawer(int id) {
	drawer.push_back(id);
	sizedrawer++;
}
void Data::SubtractCardFromDrawer(int id) {
	drawer.remove(id);
	sizedrawer--;
}
//----NPCs:
void Data::AddDefeatedNPC(int id) {
	defeatedNPCS.push_back(id);
	sizenpcs++;
}
//----Dinero:
void Data::AddMoney(int m) {
	currentMoney += m;
}
void Data::SubtractMoney(int m) {
	currentMoney -= m;
}
//----Almas:
void Data::AddSouls(int s) {
	currentSouls += s;
}
//----Caso:
void Data::AddCurrentCase() {
	currentCase++;
}

//------Busqueda:
//----Mazo:
bool Data::IdIsInMaze(int id) {
	auto it = std::find(maze.begin(), maze.end(), id);

	return (it != maze.end()) ? true : false;

	/*if (it != maze.end()) {
		return true;
	}
	else {
		return false;
	}*/
}
;
//----Cajon:
bool Data::IdIsInDrawer(int id) {
	auto it = std::find(drawer.begin(), drawer.end(), id);

	return (it != drawer.end()) ? true : false;
};
//----NPCs:
bool Data::IdIsInDefeatedNPC(int id) {
	auto it = std::find(defeatedNPCS.begin(), defeatedNPCS.end(), id);

	return (it != defeatedNPCS.end()) ? true : false;
};

//------Escribir en el archivo:
void Data::write() {
	ofstream file;
	file.open("guardado/save.txt");

	file << currentMoney << "\n";
	file << currentCase << "\n";
	file << currentSouls << "\n";

	file << sizemaze << "\n";
	for (const auto it : maze) {
		file << it << "\n";
	}
	file << sizedrawer << "\n";
	for (const auto it : drawer) {
		file << it << "\n";
	}
	file << sizenpcs << "\n";
	for (const auto it : defeatedNPCS) {
		file << it << "\n";
	}
	file.close();
}

//------Lectura del archivo:
void Data::read() {
	emptylists();

	ifstream file;
	file.open("guardado/save.txt");

	int number;

	file >> number;
	currentMoney = number;

	file >> number;
	currentCase = number;

	file >> number;
	currentSouls = number;

	file >> number;
	sizemaze = number;
	for (int i = 0; i < sizemaze; i++)
	{
		file >> number;
		maze.push_back(number);
	}

	file >> number;
	sizedrawer = number;
	for (int i = 0; i < sizedrawer; i++)
	{
		file >> number;
		drawer.push_back(number);
	}

	file >> number;
	sizenpcs = number;
	for (int i = 0; i < sizenpcs; i++)
	{
		file >> number;
		defeatedNPCS.push_back(number);
	}

	file.close();
}

//------Vaciar:
void Data::emptylists() {
	maze.clear();
	drawer.clear();
	defeatedNPCS.clear();
	sizemaze = 0;
	sizedrawer = 0;
	sizenpcs = 0;
}
