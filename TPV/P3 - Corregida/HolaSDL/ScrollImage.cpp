#include "checkML.h"
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

bool ScrollImage::isOut()
{
	return (position.getY() + texture->getFrameHeight() <= 0.0); // La imagen sale entera, se ve el fondo de SDL pero no pasa nada.
}

void ScrollImage::move()
{
	// Actualizacion de la posicion.
	position = position - Vector2D(0.0, SCROLL_IMAGE_SPEED);

	// Actualizacion del rectangulo.
	rect.x = position.getX();
	rect.y = position.getY();
}