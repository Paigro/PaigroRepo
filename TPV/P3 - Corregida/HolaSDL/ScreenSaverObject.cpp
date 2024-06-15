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

	if (sayHello) // Si esta diciendo hola cambia su angulo para dar la voltereta.
	{
		angle += 10;
	}

	if (angle > 360) // Si el angulo supera los 360 (ha dado una vuelta entera) deja de decir hola.
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

void ScreenSaverObject::move()
{
	// Dice hola si le toca decrilo.
	if (!sayHello)
	{
		position = position + Vector2D<double>(10.0 * dirX, 10.0 * dirY);
	}

	// Si esta en esa posicion dice hola.
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
		position = Vector2D<double>(400.0, -20.0); // Aparece por arriba...
		dirX = 0;
		dirY = 1; // ...y se mueve hacia abajo.
	}

	if (position.getY() < 0.0 - texture->getFrameHeight() || position.getY() >= 600.0 + texture->getFrameHeight()) // Salirse por abajo o arriba.
	{
		position = Vector2D<double>(-20.0, 300.0); // Aparece a la izquierda...
		dirX = 1; // ...y se mueve hacia la derecha.
		dirY = 0;
	}
}