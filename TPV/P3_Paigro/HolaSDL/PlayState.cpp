#include "checkML.h"
#include "PlayState.h"
#include "SDLApplication.h"
#include "GameState.h"

#include <iostream>
#include <string>

using namespace std;

#pragma region constructora/destructora

PlayState::PlayState(SDLApplication* _sdlApp, bool guardado) :
	GameState(_sdlApp),
	renderer(_sdlApp->getRenderer())
{
	if (guardado)
	{
		cargado();
	}
	else
	{
		map = map + "original.txt";
	}

	readMap();

	// Mete mothership e infobar a la lista de objetos.
	addObject(mother);
	addObject(info);
}

void PlayState::readMap()
{
	std::ifstream file; // Inicialza el ifstream.

	file.open(map);

	if (file.fail())
	{
		throw FileNotFoundError("No se puede encuentra el archivo: "s + map);
	}
	if (file.peek() == std::ifstream::traits_type::eof())
	{
		throw FileFormatError("El siguiente archivo esta vacio: "s + map);
	}

	// Variables int auxiliares:
	int objeto, subtAlien, lives, state, nAliens = 0;
	// Variables double auxiliares:
	double dato1, dato2, dato3;

	while (!file.eof()) // Lectura de objetos.
	{
		file >> objeto >> dato1 >> dato2;

		if (objeto == 3) // Si es la madre se crea a parte y no se mete en la lista
		{
			file >> dato3;
			mother->setMotherParams(dato1, dato2, dato3);
		}
		else if (objeto == ID_INFOBAR) // InfoBar no se mete en la lista.
		{
			info = new InfoBar(this, getGame(), Point2D<double>(10, SCRHEIGHT - 30), dato1);
		}
		else
		{
			SceneObject* newObj;
			char c;
			switch (objeto)
			{
			case ID_CANNON: // Cannon.
				file >> lives >> dato3;
				canion = new Cannon(this, Point2D<double>(dato1, dato2), getGame()->getTexture(SPACESHIP), lives, dato3);
				newObj = canion;
				addEventListener(canion);
				break;
			case ID_ALIEN: // Aliens.
				file >> subtAlien;
				newObj = new Alien(this, Point2D<double>(dato1, dato2), subtAlien, getGame()->getTexture(ALIENS), mother);
				nAliens++;
				break;
			case ID_SHOOTERALIEN: // ShooterAliens.
				file >> subtAlien >> dato3;
				newObj = new ShooterAlien(this, Point2D<double>(dato1, dato2), subtAlien, getGame()->getTexture(ALIENS), mother, dato3);
				nAliens++;
				break;
			case 4: // Bunkers.
				file >> lives;
				newObj = new Bunker(this, lives, Point2D<double>(dato1, dato2), getGame()->getTexture(BUNKER));
				break;
			case ID_UFO: // UFO.
				file >> state >> dato3;
				newObj = new UFO(this, Point2D<double>(dato1, dato2), getGame()->getTexture(UFOT), state, dato3);
				break;
			case ID_LASER: // Lasers.
				file >> c;
				newObj = new Laser(this, Point2D<double>(dato1, dato2), c);
				break;
			case ID_BOMBA: // Bombas.
				file >> dato3;
				file >> c;
				newObj = new Bomb(this, Point2D<double>(dato1, dato2), dato3, c);
				break;
			default:
				throw FileFormatError("Objeto inesperado");
				break;
			}
			addSceneObject(newObj);
		}
	}
	mother->setAlienCount(nAliens);
}

void PlayState::addSceneObject(SceneObject* obj)
{
	addObject(obj);
	entities.push_back(obj); // Metemos la nueva entidad en la lista.
}

#pragma endregion

void PlayState::update()
{
	GameState::update(); // Update de la clase base.

	if (mother->getAlienCount() <= 0)
	{
		sdlApp->getStMachine()->replaceState(new ScrollingState(sdlApp, sdlApp->getTexture(SCROLLWIN), new EndState(sdlApp, true)));
	}
}

void PlayState::render() const
{	
	// Renderiza la imagen de fondo
	getGame()->getTexture(STARS)->render();

	// Render de la clase base.
	GameState::render();
}

void PlayState::handleEvent(const SDL_Event& event)
{
	GameState::handleEvent(event);
	if (event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE)
	{
		sdlApp->getStMachine()->pushState(new PauseState(sdlApp, this));
	}
}

#pragma region Danyo y fin de juego
void PlayState::fireLaser(const Point2D<double>& pos, char c)
{
	//cout << "Game: pium pium" << endl;
	SceneObject* newObj = new Laser(this, pos, c);
	addSceneObject(newObj);
}

void PlayState::fireBomb(const Point2D<double>& position)
{
	//cout << "Lanza bomba" << endl;
	addSceneObject(new Bomb(this, position, 2, 'a'));
}

void PlayState::fireReward(const Point2D<double>& position)
{
	//cout << "Lanza Rewars" << endl;
	addSceneObject(new Reward(this, position, [this]() { canion->setInvincible(); }, sdlApp->getTexture(SHIELD)));
}

void PlayState::fireKamikaze(const Point2D<double>& position)
{
	//cout << "Lanza Kamikaze" << endl;
	addSceneObject(new Kamikaze(this, position, sdlApp->getTexture(KAMIKAZE), 'a'));
}

bool PlayState::mayGrantReward(SDL_Rect rect)
{
	SDL_Rect canionRect = canion->getRect();
	return SDL_HasIntersection(&rect, &canionRect);
}

bool PlayState::damage(SDL_Rect _rect, Weapon c)
{
	bool end = false;

	// Comprueba el hit de todos los objetos o hasta que encuentra un objeto con el que choca
	for (auto& i : entities)
	{
		if (!end) end = i.hit(_rect, c.getEntityType());
	}

	return end;
}
void PlayState::hasDied(GameList<SceneObject, false>::anchor scAnch, GameList<GameObject, true>::anchor objAnch)
{
	entities.erase(scAnch);
	eraseObject(objAnch);
}
void PlayState::gameOver()
{
	sdlApp->getStMachine()->replaceState(new ScrollingState(sdlApp, sdlApp->getTexture(SCROLLLOSE), new EndState(sdlApp, false)));
}
#pragma endregion

#pragma region Carga y guardado

void PlayState::saveGame()
{
	cout << "introduce numero de archivo:\n";
	string n;
	cin >> n;

	ofstream file("assets/maps/guardado" + n + ".txt");

	save(file);
}

Point2D<double> const PlayState::getCanonPos()
{
	return canion->getPos();
}

void PlayState::save(std::ostream& file) const
{
	for (auto& i : entities)
	{
		i.save(file); // Llama a los save de todas las entidades de la lista: 0=Cannon, 1=Alien, 2=ShooterAlien, 4=Bunker, 5=UFO, 6=Laser, 8=Bomba, 9=Shield.
	}
	mother->save(file); // Llama al save de la MotherShip (3). La ponemos la ultima para que se pueda hacer el recuento de Aliens.
	info->save(file); // Llama al save del infobar (7)
}

void PlayState::cargado()
{
	cout << "introduce numero de archivo:\n";
	string n;
	cin >> n;

	map = map + "guardado" + n + ".txt";
}
#pragma endregion


bool PlayState::onEnter()
{
	cout << "\n\nENTER PLAY STATE\n";

	teoria(); // PAIGRO AQUI: Borrar.

	return true;
}
bool PlayState::onExit()
{
	cout << "\nEXIT PLAY STATE\n";
	return true;
}

int PlayState::getRandomRange(int min, int max)
{
	return  uniform_int_distribution<int>(min, max)(randomGenerator);
}

void PlayState::teoria()
{
	// Practicando teoria con Nieves:


	/*// EXAMEN 2024 ENE:

	// 3.b:
	GameObject* g = new SceneObject(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP)); // A* a = new B(7, 1);
	g->render(); // a->m;

	// 3.d:
	SceneObject* sc = static_cast<SceneObject*>(g); // B* b1 = static_cast<B*>(a);
	SceneObject* sc2 = dynamic_cast<SceneObject*>(g); // B* b2 = dynamic_cast<B*>(a);
	// Los casting no vuelven a llamar a las constructoras.

	(*sc).hola(); // (*b1).m();
	sc2->hola(); // b2->m();

	delete sc; // Hay que eliminarlo porque es estatico, si no se pone deja MemoryLeaks.
	//delete sc2; // No hace falta, no deja MemoryLeaks.

	// 3.e:
	GameObject** gs = new GameObject * [3]; // A** as = new
	SceneObject s2(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP));
	gs[0] = new SceneObject(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP)); // Se hacen en el heap. Eliminar.
	gs[1] = &s2;
	gs[2] = gs[0];

	delete gs[0]; // Es el que deja MemoryLeaks.
	delete[]gs; // Eliminar el contenedor en si.
	*/


	// EXAMEN 2019 FEB:
	/*// 1.a:
	int* a = new int;
	*a = 100;
	std::cout << *a << std::endl;
	delete a; // Anyadido para que no deje basura. Resto bien.
	a = new int;
	*a = 32;
	std::cout << *a << std::endl;
	delete a;

	// 1.b:
	int* b;
	int* c;
	b = new int(10);
	c = b;
	*c = 42;
	std::cout << *b << std::endl;
	//delete b; // Hay que quitar este delete, al hace delete de uno se hace el del otro y viceversa.
	std::cout << *c << std::endl;
	delete c;

	// 1.c:
	int** ds = new int* [5];
	for (int i = 0; i < 5; i++)
	{
		ds[i] = new int(i);
	}
	delete ds[0]; // Esto para que no se quede donde apunta ds[0] como basura sin ser apuntada por nada.
	ds[0] = ds[4];
	*ds[0] = 0;
	for (int i = 0; i < 5; i++)
	{
		std::cout << *ds[i] << std::endl;
	}
	for (int i = 1; i < 5; i++) // Anyadido esto porque hay que eliminar el contenido antes que el contenedor para que no deje basura. Empieza en 1 porque ds[0] y ds[4] apuntan a lo mismo.
	{
		delete ds[i];
	}
	delete[]ds;

	//1.d:
	list<int*> e;
	for (int i = 0; i < 5; i++)
	{
		e.push_back(new int(i));
	}
	auto it = e.begin();
	it++;
	delete* it; // Hay que eliminar el contenido antes de eliminar la flecha.
	e.erase(it);
	it = e.begin();
	int* f = *it; // Esto esta mal, falta un *: *it.
	std::cout << *f << std::endl;
	it++;
	std::cout << **it << std::endl; // Accede al contenido de la flecha de la flecha. Un it es una flecha
	for (auto i = e.begin();i != e.end();++i)
	{
		delete* i; // Anyadir esto para liberar memoria.
	}*/

	/*// 3.a:
	SceneObject b1(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP));
	SceneObject b2 = b1;

	// 3.b:
	SceneObject* c1 = new Alien(this, Point2D<double>(3.0, 3.0), 2, sdlApp->getTexture(CARGARP), mother);
	SceneObject* c2 = c1; // Esta mal Alien* c2 = c1, tiene que ser SceneObject*
	c2->hola();
	delete c2;

	// 3c:
	SceneObject* bs[3];
	bs[0] = new SceneObject(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP));
	bs[1] = new Alien(this, Point2D<double>(3.0, 3.0), 2, sdlApp->getTexture(CARGARP), mother);
	bs[2] = new Alien(this, Point2D<double>(3.0, 3.0), 2, sdlApp->getTexture(CARGARP), mother);
	for (int i = 0; i < 3; ++i)
	{
		bs[i]->hola();
	}
	for (int i = 0; i < 3; ++i)
	{
		delete bs[i];
	}*/


	// EXAMEN 2018 FEB:
	/*// 1.a:
	int* p1; int* p2; // Como no hacen new esto no dejan basura.
	int n = 5; // Como n se va a borrar al salir de ambito porque es estatica, los punteros no van a apuntar a nada entonces no hace falta borrar nada.
	p1 = &n;
	p2 = p1;
	// Esta bien.*/

	/*// 1.b:
	int* p1 = new int;
	int* p2;
	int n = 5;
	delete p1; // Anyadir esto para que el new int se borre y no se quede sin nada que lo apunte y deje basura. Eliminas la memoria a lo que apunta y se queda como direccion invalida, habria que ponerlo a nullptr o apuntarlo a otra cosa.
	p1 = &n;
	p2 = p1;
	// El resto esta bien.*/

	/*// 1.c:
	int* ts[5];
	for (int i = 0; i < 5; i++) {
		ts[i]  = new int();
	}

	for (int i = 0; i < 5; i++) { // Anyadir esto para eliminar la basura. Poner a nullptr como buena practica.
		delete ts[i];
		ts[i] = nullptr;
	}
	//*/

	/*// 1.d:
	int** ts = new int* [5];
	for (int i = 0; i < 5; i++) {
		ts[i] = new int;
	}
	for (int i = 0; i < 5; i++)
	{
		delete ts[i]; // Anyadir esto para eliminar la basura.
		ts[i] = nullptr;
	}
	delete[]ts;
	//*/

	/*// 1.e:
	list<int*> ts;
	for (int i = 0; i < 5; i++) {
		ts.push_back(new int());
	}
	int* first = ts.front();
	int* last = ts.back();
	for (auto i = ts.begin();i != ts.end();++i)
	{
		delete* i; // Anyadir esto para liberar memoria.
	}
	//*/

	/*// 1.f:
	int rows = 10; int cols = 10;
	int** ts;
	ts = new int* [rows];
	for (int r = 0; r < rows; r++) {
		ts[r] = new int[cols];
	}
	for (int i = 0; i < rows; i++)
	{
		delete ts[i]; // Lo mismo que el 1.d.
		ts[i] = nullptr;
	}
	delete[]ts;
	//*/

	/*// Otros
	Alien c(this, Point2D<double>(3.0, 3.0), 2, sdlApp->getTexture(CARGARP), mother);
	SceneObject b = c;
	b.hola();

	// 3.c:
	GameObject* b1 = new SceneObject(this, Point2D<double>(3.0, 3.0), 45, 45, sdlApp->getTexture(CARGARP)); // casting ascendente si.
	GameObject* b2 = b1; // No puede ser SceneObject tiene que ser GameObject.
	delete b1;
	b1 = new Alien(this, Point2D<double>(3.0, 3.0), 2, sdlApp->getTexture(CARGARP), mother);

	Alien* sc = new ShooterAlien(this, Point2D<double>(3.0, 3.0), 3, sdlApp->getTexture(UFOT), mother, 3.0);
	//*/
}