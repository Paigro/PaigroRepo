#pragma once
#include "GameState.h"
#include "texture.h"

constexpr int POS_TITLE_FIN_X(300), POS_TITLE_FIN_Y(100),
				POS_VOLVER_X(250), POS_VOLVER_Y(250),
				POS_SALIR_ENX(350), POS_SALIR_ENY(400);

class EndState : public GameState
{
private:

	SDL_Rect rect; // Rectangulo del texto de victoria o derrota.
	Texture* tex; // Textura del texto de victoria o derrota.

	bool hasWon = false; // Para guardar si el jugador a ganado o perdido.


	//------Botones:

	Button* volverMenu; // Boton para volver al menu.
	Button* salir; // Boton para salir.

public:

	//------Constructoras y destructoras:

	// Construcora de EndState.
	EndState(SDLApplication* _sdlApp, bool win);
	// Destructora de EndState.
	//~EndState();


	//------Metodos heredados:

	// Update de EndState.
	void update() override;
	// Update de EndState.
	void render() const override;
	// Update de EndState.
	void save(std::ostream& fil) const override {}
	// Update de EndState.
	void handleEvent(const SDL_Event& event) override { GameState::handleEvent(event); }


	//------Metodos de los estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "EndST"; }
};