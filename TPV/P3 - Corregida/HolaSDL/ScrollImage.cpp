#include "ScrollImage.h"

ScrollImage::ScrollImage(GameState* state, Point2D<double> pos, const Texture* tex) :
	SceneObject(state, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex)
{

}

void ScrollImage::update()
{
	if (!finish)
	{
		move();
		//std::cout << position.getX() << " :x,y: " << position.getY() << std::endl;
	}

	if (isOut())
	{
		finish = true;
	}
}

void ScrollImage::render() const
{
	//texture->render(rect);
	texture->renderRect(rect);
}

bool ScrollImage::hit(SDL_Rect rect, char c)
{
	return false;
}

void ScrollImage::save(std::ostream& fil) const
{

}

bool ScrollImage::isOut()
{
	return (position.getY() + texture->getFrameHeight() <= 0.0);
}

void ScrollImage::move()
{
	position = position - Vector2D(0.0, SCROLL_IMAGE_SPEED); // Movimiento.

	// Actualizacion del rectangulo.
	rect.x = position.getX();
	rect.y = position.getY();
}