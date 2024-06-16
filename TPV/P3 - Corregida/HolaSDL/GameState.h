#pragma once
#include "SDL.h"
#include "GameObject.h"
#include "gameList.h"
#include "EventHandler.h"

#include <list>

class SDLApplication;
class Button;

class GameState
{
protected:

	GameList<GameObject, true> objs; // GameList de objetos del juego.
	std::list<EventHandler*> listeners; // Lista de los objetos que tienen listeners.
	SDLApplication* sdlApp; // Referencia a la sdlApp.

public:

	//------Constructoras y destructoras:

	// Construcora de GameState.
	GameState(SDLApplication* _sdlApp) :
		sdlApp(_sdlApp)
	{

	}
	// Destructora virtual.
	virtual ~GameState() = default;


	//------Metodos para heredar:

	// Update virtual.
	virtual void update() = 0;
	// Render virtual.
	virtual void render() const = 0;
	// HandleEvent vritual
	virtual void handleEvent(const SDL_Event& event);
	// Save virtual.
	virtual void save(std::ostream& fil) const = 0;
	// OnEnter virtual
	virtual bool onEnter() = 0;
	// OnExit virtual.
	virtual bool onExit() = 0;
	// GetStateID virtual.
	virtual std::string getStateID() const = 0;


	//------Gestion de los objetos:

	// Mete un objeto a la ista de objetos.
	void addObject(GameObject* obj);
	// Elimina un objeto de la lista de objetos.
	void eraseObject(GameList<GameObject, true>::anchor anch);
	// Mete un EventHandle (como un boton) a la lista de EventHandlers.
	void addEventListener(EventHandler* lis) { listeners.push_back(lis); }


	//------Getters y setters:

	// Devuelve el sdlApp.
	SDLApplication* getGame() const { return sdlApp; };
};