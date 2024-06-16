#pragma once

#include "GameState.h"
#include "texture.h"

class ScrollImage;

class ScrollingState : public GameState
{
private:

	GameState* nextState = nullptr; // Referencia al siguiente estado.
	Texture* imageTexture = nullptr; // Renferencia a la textura de la ScrollingImage.
	ScrollImage* imagenScroll = nullptr; // Imagen que se va a scrollear.

public:

	//------Constructoras y destructoras:

	// Construcora de ScrollingState.
	ScrollingState(SDLApplication* _sdlApp, Texture* tex, GameState* nextST);
	// Destructora de ScrollingState.
	//~ScrollingState();


	//------Metodos heredados:

	// Update de EndState.
	void update() override;
	// Update de EndState.
	void render() const override;
	// Update de EndState.
	void save(std::ostream& fil) const override;
	// Update de EndState.
	void handleEvent(const SDL_Event& event) override;


	//------Metodos de los estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "ScrollST"; }

	//------Metodos de la clase:

	// Cambia al estado siguiente que sea.
	void changeState(GameState* state);
};