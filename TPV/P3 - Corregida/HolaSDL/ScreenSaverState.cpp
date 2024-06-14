#include "checkML.h"
#include "ScreenSaverState.h"
#include "SDLApplication.h"

ScreenSaverState::ScreenSaverState(SDLApplication* _sdlApp) :
	GameState(sdlApp)
{

}

void ScreenSaverState::update()
{

}

void ScreenSaverState::render() const
{

}

void ScreenSaverState::handleEvent(const SDL_Event& event)
{
	GameState::handleEvent(event);
	if (event.type == SDL_KEYDOWN)
	{
		changeState();
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