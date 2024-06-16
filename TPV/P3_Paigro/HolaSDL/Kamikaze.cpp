#include "checkML.h"
#include "Kamikaze.h"
#include "PlayState.h"
#include "SDLApplication.h"

#include <cmath>

Kamikaze::Kamikaze(PlayState* gam, Point2D<double> pos, const Texture* tex, char c) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	Weapon(c)
{
	moveCountDown = 0;
}

void Kamikaze::update()
{
	if (position.getY() >= SCRHEIGHT + texture->getFrameHeight()) // Para cuando sale de los limites.
	{
		playST->hasDied(scAnch, objAnch);
	}

	if (moveCountDown >= TIME_TO_MOVE) // Actualiza su posicion cuando debe.
	{
		updatePosition();
		moveCountDown = 0;
	}
	moveCountDown++;

	// Comprueba si el kamikaze choca.
	if (playST->damage(rect, getEntityType()))
	{
		if (damage <= 1)
		{
			playST->hasDied(scAnch, objAnch);
		}
		else
		{
			damage--;
		}
	}
}

void Kamikaze::render() const
{
	if (direction != 0) // Cuando la direccion no es 0 (no tiene a la nave debajo) se calcula el angulo.
	{
		double angle = 180 / (M_PI * atan(velocidadKamikaze.getX() * direction / velocidadKamikaze.getY())); // Para sacar el angulo.
		texture->renderFrame(rect, 0, 0, angle);
	}
	else // Cuando la direccion es 0 (tiene la nave debajo) se hace un render normal.
	{
		texture->render(rect);
	}
}

bool Kamikaze::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != getEntityType() && SDL_HasIntersection(&rect, &_rect))
	{
		//cout << "Kamikaze: hit." << endl;		
		playST->addScore(5);
		playST->hasDied(scAnch, objAnch);
		return true;
	}
	return false;
}

void Kamikaze::save(std::ostream& fil) const
{

}

void Kamikaze::updatePosition()
{
	double cannonPosY = playST->getCannonYPos();
	double cannonPosX = playST->getCannonXPos();
	direction = 0; // Suponemos que siempre va a ir hacia abajo.

	if (position.getY() <= cannonPosY) // Si esta por encima del cannon entonces su direccion puede cambiar hacia los lados dependiendo de su posicion respecto al canion.
	{
		if (position.getX() < cannonPosX - 5.0) // k <  c
		{
			direction = 1; // Va a la derecha.
		}
		else if (position.getX() > cannonPosX + 5.0) // c  >  k
		{
			direction = -1; // Va a la izquierda.
		}
		// Movimiento.
		position = position + Vector2D(velocidadKamikaze.getX() * direction, velocidadKamikaze.getY());
	}
	else // Esto es para que cuando este por debajo del cannon vaya mas rapido y se vaya antes.
	{
		// Movimiento.
		position = position + Vector2D(velocidadKamikaze.getX() * direction, velocidadKamikaze.getY() * 2);
	}

	// Actualiza posicion del rect.
	rect.x = position.getX();
	rect.y = position.getY();
}