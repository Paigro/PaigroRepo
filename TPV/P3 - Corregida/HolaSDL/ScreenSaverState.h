#pragma once

#include "GameState.h"
#include "texture.h"

class SceneObject;

class ScreenSaverState : public GameState
{
public:

	// Constructora.
	ScreenSaverState(SDLApplication* _sdlApp);


	//------Metodos overrided:

	// Update.
	void update() override;
	// Render.
	void render() const override;
	// HandleEvent.
	void handleEvent(const SDL_Event& event) override;
	// Save.
	void save(std::ostream& fil) const override;


	//------Estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "ScreenSaveST"; }
	// Cambia al estado siguiente
	void changeState();

private:
	// El UFO que va a aparecer en pantalla moviendose.
	SceneObject* ufo = nullptr; 

};