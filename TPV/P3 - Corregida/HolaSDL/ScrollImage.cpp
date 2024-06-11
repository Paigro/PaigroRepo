#include "ScrollImage.h"

ScrollImage::ScrollImage(GameState* state, Point2D<double> pos, const Texture* tex) :
	SceneObject(state, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex)
{

}

void ScrollImage::update()
{

}

void ScrollImage::render() const
{

}

bool ScrollImage::hit(SDL_Rect rect, char c)
{
	return false;
}

void ScrollImage::save(std::ostream& fil) const
{

}
