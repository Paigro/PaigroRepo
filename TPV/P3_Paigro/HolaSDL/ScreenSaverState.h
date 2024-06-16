#pragma once

#include "GameState.h"
#include "texture.h"

class SceneObject;

class ScreenSaverState : public GameState
{

private:

	SceneObject* ufo = nullptr;	// El UFO que va a aparecer en pantalla moviendose.

public:

	//------Constructoras y destructoras:

	// Construcora de ScreenSaverState.
	ScreenSaverState(SDLApplication* _sdlApp);
	// Destructora de ScreenSaverState.
	//~ScreenSaverState();


	//------Metodos heredados:

	// Update de ScreenSaverState.
	void update() override;
	// Update de ScreenSaverState.
	void render() const override;
	// Update de ScreenSaverState.
	void save(std::ostream& fil) const override;
	// Update de ScreenSaverState.
	void handleEvent(const SDL_Event& event) override;


	//------Metodos de los estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "ScreenSaveST"; }


	//------Metodos de la clase:

	// Cambia al estado siguiente
	void changeState();
};