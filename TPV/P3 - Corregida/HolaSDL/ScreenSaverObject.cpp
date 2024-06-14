#include "checkML.h"
#include "ScreenSaverObject.h"

ScreenSaverObject::ScreenSaverObject(GameState* gam, Point2D<double> pos, const Texture* tex, bool follower) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	hasToBeFollowed(!follower)
{
	dirX = 0;
	dirY = 0;
}

void ScreenSaverObject::update()
{
	rect.x = position.getX();
	rect.y = position.getY();
}

void ScreenSaverObject::render() const
{

}

bool ScreenSaverObject::hit(SDL_Rect rect, char c)
{
	return false;
}

void ScreenSaverObject::save(std::ostream& fil) const
{

}

void ScreenSaverObject::move()
{
	if (hasToBeFollowed) // Nave.
	{
		
	}



	// Actualiza posicion del rect.
	rect.x = position.getX();
	rect.y = position.getY();
}
