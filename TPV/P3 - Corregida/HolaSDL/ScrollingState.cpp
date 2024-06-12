#include "ScrollingState.h"
#include "SDLApplication.h"
#include "ScrollImage.h"

ScrollingState::ScrollingState(SDLApplication* _sdlApp, Texture* tex, GameState* nextST) :
	GameState(_sdlApp),
	nextState(nextST), imageTexture(tex)
{
	imagenScroll = new ScrollImage(this, Point2D<double>(0.0, SCRHEIGHT), imageTexture);
	addObject(imagenScroll);
}

void ScrollingState::update()
{
	for (GameObject& e : objs)
	{
		e.update();
	}

	if (imagenScroll->getFinish())
	{
		changeState(nextState);
	}
}

void ScrollingState::render() const
{
	GameState::render();
}

void ScrollingState::handleEvent(const SDL_Event& event)
{
	GameState::handleEvent(event);
	if (event.type == SDL_KEYDOWN)
	{
		changeState(nextState);
	}
}

void ScrollingState::save(std::ostream& fil) const
{

}

bool ScrollingState::onEnter()
{
	std::cout << "\nENTER SCROLLSTATE.\n";
	return true;
}

bool ScrollingState::onExit()
{
	std::cout << "\EXIT SCROLLSTATE.\n";
	return true;
}

void ScrollingState::changeState(GameState* state)
{
	getGame()->getStMachine()->replaceState(state);
}
