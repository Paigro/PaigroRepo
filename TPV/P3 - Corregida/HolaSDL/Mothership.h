#pragma once
#include "GameObject.h"
#include <vector>


class Mothership : public GameObject
{
private:

	enum state : int { MOVE, STOP, SPIN, LANDED };
	state _state = MOVE; // Estado en el que se encuentran los aliens.

	PlayState* playST = nullptr; // Referencia al PlayState.

	
	int maxTime = 10; // Tiempo para moverse.
	int moveCountDown = 0; // Contador para  moverse.

	int direction = 1;	// Direccion de los aliens.

	int nAliens = 44; // Numero de aliens.

	int aliensReistrados = 0;	// Aliens que han llamado al mothership para comprobar si moverse.

	int level = 0; // Nivel de altura.


	//------Cosas para el kamikaze:

	double timeToKamikaze; // Tiempo para el siguiente kamikaze.
	double kamikazeCountDown = 0; // Contador para el siguiente kamikaze.
	double nextKamikazePosX; // Posicion donde va a spawnear el siguiente kamikaze.

public:

	//------Constructoras / destructoras:

	// Constructora de Mothership.
	Mothership(PlayState* plST, SDLApplication* appl);
	// Destructora de Mothership.
	//~Mothership();


	//------Metodos heredados:

	// Update de Mothership.
	void update() override;
	// Render de Mothership.
	void render() const override;
	// Save de Mothership.
	void save(std::ostream& fil) const override;


	//------Metodos de clase:

	// Resta del contador de aliens un alien.
	void alienDied();
	// Cambia el estado de los aliens a LANDED.
	void alienLanded();
	// Llama al gameOver.
	void haveLanded();
	// Cambia el estado de los aliens a SPIN para que se den la vuelta.
	void canNotMove();
	// Comprueba si los aliens se pueden mover .
	bool shouldMove();
	// Genera un kamikaze en la posicion que sea.
	void generateKamikaze();


	//------Getters y setters:

	 // Devuelve el nivel en el que estan los aliens.
	int getLevel() const { return level; }
	// Devuelve la cantidad de aliens que controla la mothership.
	int getAlienCount() const;
	// Devuelve la direccion a la que se mueven los aliens.
	int getDirection() const { return direction; } // Devuelve la direccion de movimiento.
	// Setea los parametros de la nave: estado de los aliens, nivel en el que estan y tiempo para moverse
	void setMotherParams(int sta, int lev, int mcd);
	// Setea el numero de aliens que tiene la mothersjip.
	void setAlienCount(int _nAliens);
};