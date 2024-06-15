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
	std::list<EventHandler*> listeners; // Los objetos que tienen listeners.
	SDLApplication* sdlApp; // Referencia a la sdlApp.

public:
	// Constructora de GameState.
	GameState(SDLApplication* _sdlApp) : sdlApp(_sdlApp)
	{

	}
	// Destructora de GameState.
	virtual ~GameState() = default;

	virtual void update() = 0;
	virtual void render() const = 0;
	virtual void handleEvent(const SDL_Event& event);
	virtual void save(std::ostream& fil) const = 0;

	virtual bool onEnter() = 0;
	virtual bool onExit() = 0;
	virtual std::string getStateID() const = 0;


	//------Gestion de los objetos:

	// Anyade un objeto a la ista de objetos.
	void addObject(GameObject* obj);
	// Elimina un objeto de la lista de objetos.
	void eraseObject(GameList<GameObject, true>::anchor anch);

	// Anyade un EventHandle (como un boton) a la lista de EventHandlers.
	void addEventListener(EventHandler* lis) { listeners.push_back(lis); }

	// Devuelve el sdlApp.
	SDLApplication* getGame() const { return sdlApp; };
};
