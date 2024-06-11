#include "Kamikaze.h"
#include "PlayState.h"
#include "SDLApplication.h"

#include <cmath>

Kamikaze::Kamikaze(PlayState* gam, Point2D<double> pos, const Texture* tex, char c) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	Weapon(c)
{
	elapsedMove = 0;
}

void Kamikaze::update()
{
	if (position.getY() >= SCRHEIGHT + texture->getFrameHeight()) // Para cuando sale de los limites.
	{
		playST->hasDied(scAnch, objAnch);
	}

	if (elapsedMove >= timeToMove)
	{
		updatePosition();
		elapsedMove = 0;
	}
	elapsedMove++;

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
	if (direction != 0)
	{
		double angle = 180 / (M_PI * atan(velocidadKamikaze.getX() * direction / velocidadKamikaze.getY())); // Para sacar el angulo.
		texture->renderFrame(rect, 0, 0, angle);
	}
	else
	{
		texture->render(rect);
	}
}

bool Kamikaze::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != getEntityType() && SDL_HasIntersection(&rect, &_rect))
	{
		//std::cout << "COLISIOOOOOOOOOOOOOOOOOOOOOON" << std::endl;
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
	double canionPosY = playST->getCannonYPos();
	double canionPosX = playST->getCannonXPos();
	direction = 0; // Suponemos quesiempre va a ir hacia abajo.
	
	if (position.getY() <= canionPosY) // Si esta por encima del canion entonces su direccion puede cambiar hacia los lados dependiendo de su posicion respecto al canion.
	{
		if (position.getX() < canionPosX - 5.0) // k <  c
		{
			direction = 1; // Va a la derecha.
		}
		else if (position.getX() > canionPosX + 5.0) // c  >  k
		{
			direction = -1; // Va a la izquierda.
		}
	}

	// Movimiento.
	position = position + Vector2D(velocidadKamikaze.getX() * direction, velocidadKamikaze.getY());

	// Actualiza posicion del rect.
	rect.x = position.getX();
	rect.y = position.getY();
	
	//std::cout << canionPosX << " :x,canon,y:" << canionPosY << std::endl;
	//std::cout << position.getX() << " :x,y:" << position.getY() << std::endl;
	//std::cout << " direction:" << direction << std::endl;
}