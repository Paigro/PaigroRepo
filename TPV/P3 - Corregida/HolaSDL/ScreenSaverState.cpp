#include "checkML.h"
#include "ScreenSaverState.h"
#include "SDLApplication.h"

#include "SceneObject.h"
#include "ScreenSaverObject.h"

ScreenSaverState::ScreenSaverState(SDLApplication* _sdlApp) :
	GameState(_sdlApp)
{
	ship = new ScreenSaverObject(this, Point2D<double>(300.0, 300.0), sdlApp->getTexture(UFOT));
	addObject(ship);
}

void ScreenSaverState::update()
{
	for (GameObject& e : objs)
	{
		e.update();
	}
}

void ScreenSaverState::render() const
{
	getGame()->getTexture(SCREENSAVER)->render(); // Fondo.

	for (GameObject& e : objs)
	{
		e.render();
	}

	GameState::render();
}

void ScreenSaverState::handleEvent(const SDL_Event& event)
{
	GameState::handleEvent(event);
	if (event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE)
	{
		sdlApp->getStMachine()->popState();
	}
}

void ScreenSaverState::save(std::ostream& fil) const
{

}

bool ScreenSaverState::onEnter()
{
	std::cout << "\nENTER SCREENSAVESTATE.\n";
	return true;
}

bool ScreenSaverState::onExit()
{
	std::cout << "\EXIT SCREENSAVESTATE.\n";
	return true;
}

void ScreenSaverState::changeState()
{
	getGame()->getStMachine()->replaceState(new MainMenuState(sdlApp));
}