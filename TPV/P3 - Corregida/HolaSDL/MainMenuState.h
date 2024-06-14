#pragma once
#include "GameState.h"

constexpr int	POS_NUEVA_PARTIDAX(200), POS_NUEVA_PARTIDAY(150),
POS_CARGAR_PARTIDAX(200), POS_CARGAR_PARTIDAY(200),
POS_SALIR_MPRX(200), POS_SALIR_MPRY(250);

class MainMenuState : public GameState
{
private:

	Button* nuevaPartida;
	Button* cargarPartida;
	Button* salir;

	const int TIME_TO_SCREEN_SAVER = 100; // Al pasar este tiempo se pone el ScreenSaver.
	int screenSaverCountDown; // Contador para el ScreenSaver.

public:

	MainMenuState(SDLApplication* _sdlApp);

	void update() override;
	void render() const override;
	void save(std::ostream& fil) const override;
	void handleEvent(const SDL_Event& event) override;

	bool onEnter() override;
	bool onExit() override;
	std::string getStateID() const override { return "MenuST"; }

	void changeToScreenSaver();

};