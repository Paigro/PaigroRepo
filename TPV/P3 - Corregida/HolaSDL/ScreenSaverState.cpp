#include "checkML.h"
#include "ScreenSaverState.h"
#include "SDLApplication.h"

ScreenSaverState::ScreenSaverState(SDLApplication* _sdlApp) :
	GameState(_sdlApp)
{

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
	for (GameObject& e : objs)
	{
		e.render();
	}
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