#pragma once
#include "GameState.h"

constexpr int	POS_NUEVA_PARTIDAX(200), POS_NUEVA_PARTIDAY(150),
POS_CARGAR_PARTIDAX(200), POS_CARGAR_PARTIDAY(200),
POS_SALIR_MPRX(200), POS_SALIR_MPRY(250);

class MainMenuState : public GameState
{
private:

	Button* nuevaPartida; // Boton para nueva partida.
	Button* cargarPartida; // Boton para cargar partida.
	Button* salir; // Boton para salir.

	const int TIME_TO_SCREEN_SAVER = 300; // Al pasar este tiempo se pone el ScreenSaver.
	int screenSaverCountDown; // Contador para el ScreenSaver.

public:

	//------Constructoras y destructoras:

	// Construcora de MainMenuState.
	MainMenuState(SDLApplication* _sdlApp);
	// Destructora de MainMenuState.
	//~MainMenuState();


	//------Metodos heredados:

	// Update de MainMenuState.
	void update() override;
	// Update de MainMenuState.
	void render() const override;
	// Update de MainMenuState.
	void save(std::ostream& fil) const override;
	// Update de MainMenuState.
	void handleEvent(const SDL_Event& event) override;


	//------Metodos de los estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return "MenuST"; }


	//------Metodos de la clase:

	// Cambia al estado del salvapantalla.
	void changeToScreenSaver();
};