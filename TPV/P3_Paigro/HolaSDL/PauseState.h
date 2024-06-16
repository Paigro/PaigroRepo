#pragma once
#include "GameState.h"
#include "EventHandler.h"
#include "Vector2D.h"

constexpr double POS_CONTINUARX(285), POS_CONTINUARY(100),
POS_GUARDARX(214), POS_GUARDARY(200),
POS_CARGARX(225), POS_CARGARY(300),
POS_SALIR_PAX(330), POS_SALIR_PAY(400);

class PauseState : public GameState
{
private:

	Button* continuarB; // Boton para continuar.
	Button* guardarB; // Boton para guardar partida.
	Button* cargarB; // Boton para cargar partida.
	Button* salirB; // Boton para salir.

	PlayState* playST; // Referencia al PlayState.

	//------Funcionalidad de los botones:

	// Continuar la partida.
	void continuar();
	// Guardar la partida.
	void guardarPartida();
	// Cargar la partida.
	void cargarPartida();
	// Salir del juego.
	void salir();

public:

	//------Constructoras y destructoras:

	// Construcora de PauseState.
	PauseState(SDLApplication* _sdlApp, PlayState* _playST);
	// Destructora de PauseState.
	//~PauseState();


	//------Metodos heredados:

	// Update de PauseState.
	void update() override;
	// Update de PauseState.
	void render() const override;
	// Update de PauseState.
	void save(std::ostream& fil) const override {}
	// Update de PauseState.
	void handleEvent(const SDL_Event& event) override;


	//------Metodos de los estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "PauseST"; }
};