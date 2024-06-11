#pragma once

#include "GameState.h"


class ScrollingState : public GameState
{
public:

	// Constructora.
	ScrollingState(SDLApplication* _sdlApp, Texture* tex, GameState* nextST);


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
	std::string getStateID() const override { return "ScrollST"; }
	// Salta el scrolling.
	void skipScroll();
	// Cambia al estado siguiente
	void changeState(GameState* state);

private:



};