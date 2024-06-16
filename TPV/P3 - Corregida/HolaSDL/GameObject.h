#pragma once
#include <iostream>
#include <fstream>
#include <iterator>
#include <list>

#include "gameList.h"

class SDLApplication;
class GameState;
class PlayState;

class GameObject
{
protected:

	const SDLApplication* sdlAppl = nullptr; // Puntero al PlayState.
	GameState* gameST = nullptr; // Puntero al estado de juego
	GameList<GameObject, true>::anchor objAnch = nullptr; // Lista de anchors de objetos del juego.

public:

	//------Constructoras y destructoras:

	// Constructora que recibe un PlayState.
	GameObject(GameState* gamSt) :
		gameST(gamSt)
	{

	}
	// Constructora que recibe el sdlApp y pone gameState a nullptr.
	GameObject(SDLApplication* sdlap) :
		sdlAppl(sdlap)
	{
		gameST = nullptr;
	}
	// Destructora virtual.
	virtual ~GameObject() = default; 


	//------Metodos para heredar:
	
	// Render virtual.
	virtual void render() const = 0;
	// Update virtual.
	virtual void update() = 0;
	// Save virtual.
	virtual void save(std::ostream& fil) const = 0;


	//------Getters y setters:

	// Devuelve la lista de anchors de objetos del juego.
	const GameList<GameObject, true>::anchor& getListAnchor() const { return objAnch; }
	// Setea la lista de anchors de objetos del juego. 
	void setListAnchor(GameList<GameObject, true>::anchor anc) { objAnch = anc; }

};