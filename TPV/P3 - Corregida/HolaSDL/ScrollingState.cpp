#include "ScrollingState.h"
#include "SDLApplication.h"

ScrollingState::ScrollingState(SDLApplication* _sdlApp, Texture* tex, GameState* nextST) :
	GameState(_sdlApp)
{

}

void ScrollingState::update()
{

}

void ScrollingState::render() const
{

}

void ScrollingState::handleEvent(const SDL_Event& event)
{

}

void ScrollingState::save(std::ostream& fil) const
{

}

bool ScrollingState::onEnter()
{
	std::cout << "\nENTER SCROLLSTATE.\n";
	return false;
}

bool ScrollingState::onExit()
{
	std::cout << "\EXIT SCROLLSTATE.\n";
	return false;
}

void ScrollingState::skipScroll()
{

}

void ScrollingState::changeState(GameState* state)
{
}
