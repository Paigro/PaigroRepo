#include "checkML.h"
#include "MainMenuState.h"
#include "SDLApplication.h"
#include "GameState.h"
#include "Button.h"

using namespace std;

MainMenuState::MainMenuState(SDLApplication* _sdlApp)
	: GameState(_sdlApp)
{
	nuevaPartida = new Button(this, sdlApp->getTexture(NUEVAP), Point2D<double>(POS_NUEVA_PARTIDAX, POS_NUEVA_PARTIDAY));
	cargarPartida = new Button(this, sdlApp->getTexture(CARGARP), Point2D<double>(POS_CARGAR_PARTIDAX, POS_CARGAR_PARTIDAY));
	salir = new Button(this, sdlApp->getTexture(SALIR), Point2D<double>(POS_SALIR_MPRX, POS_SALIR_MPRY));

	addObject(nuevaPartida);
	addObject(cargarPartida);
	addObject(salir);

	addEventListener(nuevaPartida);
	addEventListener(cargarPartida);
	addEventListener(salir);

	//nuevaPartida->connectButton([this]() {sdlApp->getStMachine()->replaceState(new PlayState(sdlApp, false)); });
	nuevaPartida->connectButton([this]() {sdlApp->getStMachine()->replaceState(new ScrollingState(sdlApp, sdlApp->getTexture(SCROLL), new PlayState(sdlApp, false))); }); // PAIGRO AQUI.
	cargarPartida->connectButton([this]() {sdlApp->getStMachine()->replaceState(new PlayState(sdlApp, true)); });
	salir->connectButton([this]() {sdlApp->setEndGame(true); });

	screenSaverCountDown = 0;
}

void MainMenuState::update()
{
	for (GameObject& e : objs)
	{
		e.update();
	}

	std::cout << screenSaverCountDown << std::endl;

	if (screenSaverCountDown >= TIME_TO_SCREEN_SAVER)
	{
		changeToScreenSaver();
	}
	screenSaverCountDown++;
}

void MainMenuState::render() const
{
	sdlApp->getTexture(MENUFONDO)->render();

	for (GameObject& e : objs)
	{
		e.render();
	}
}

void MainMenuState::handleEvent(const SDL_Event& event)
{
	GameState::handleEvent(event);

	if (event.type == SDL_MOUSEBUTTONDOWN)
	{
		screenSaverCountDown = 0;
	}
}

void MainMenuState::save(ostream& fil) const
{

}

bool MainMenuState::onEnter()
{
	cout << "Entrando MainMenu\n";
	return true;
}

bool MainMenuState::onExit()
{
	cout << "Saliendo MainMenu\n";
	return true;
}

void MainMenuState::changeToScreenSaver()
{
	screenSaverCountDown = 0;
	sdlApp->getStMachine()->pushState(new ScreenSaverState(sdlApp));
}
