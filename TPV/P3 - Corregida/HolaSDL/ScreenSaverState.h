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
	std::string getStateID() const override { return "ScreenSaveState"; }
	// Cambia al estado siguiente
	void changeState();

private:

	SceneObject* ship = nullptr;
	SceneObject* ghost1 = nullptr;
	SceneObject* ghost2 = nullptr;
	SceneObject* ghost3 = nullptr;
	SceneObject* ghost4 = nullptr;

};