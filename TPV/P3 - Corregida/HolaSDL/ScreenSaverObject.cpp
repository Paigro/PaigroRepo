#include "checkML.h"
#include "ScreenSaverObject.h"

ScreenSaverObject::ScreenSaverObject(GameState* gam, Point2D<double> pos, const Texture* tex) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex)
{
	dirX = 1;
	dirY = 0;
	angle = 0;
	sayHello = false;
}

void ScreenSaverObject::update()
{
	move();

	rect.x = position.getX();
	rect.y = position.getY();

	if (sayHello)
	{
		angle += 10;
	}
	if (angle > 360)
	{
		angle = 0;
		sayHello = false;

	}
	checkLimits();
}

void ScreenSaverObject::render() const
{
	texture->renderFrame(rect, texture->getNumRows() - 1, texture->getNumColumns() - 2, angle);
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
	if (!sayHello)
	{
		position = position + Vector2D<double>(10.0 * dirX, 10.0 * dirY);
	}

	if (position.getX() == 400.0 && position.getY() == 300.0)
	{
		sayHello = true;
	}

	// Actualiza posicion del rect.
	rect.x = position.getX();
	rect.y = position.getY();
}

void ScreenSaverObject::checkLimits()
{
	if (position.getX() < 0.0 - texture->getFrameWidth() / 2 || position.getX() >= 800.0 + texture->getFrameWidth() / 2) // Salirse por la izquierda o derecha.
	{
		position = Vector2D<double>(400.0, -20.0); // Aparece por arriba.
		dirX = 0;
		dirY = 1;
	}

	if (position.getY() < 0.0 - texture->getFrameHeight() || position.getY() >= 600.0 + texture->getFrameHeight()) // Salirse por abajo o arriba.
	{
		position = Vector2D<double>(-20.0, 300.0); // Aparece a la izquierda
		dirX = 1;
		dirY = 0;
	}
}