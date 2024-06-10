#include "Kamikaze.h"
#include "PlayState.h"
#include "SDLApplication.h"

#include <cmath>

Kamikaze::Kamikaze(PlayState* gam, Point2D<double> pos, const Texture* tex, char c) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	Weapon(c)
{

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
}

void Kamikaze::render() const
{
	double angle = 180 / (M_PI * atan(position.getX() / position.getY())); // Para sacar el angulo.

	//texture->renderFrame(rect, 1, 1, angle);
	texture->render(rect);
}

bool Kamikaze::hit(SDL_Rect rect, char c)
{
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
	std::cout << canionPosX << " :x,canon,y:" << canionPosY << std::endl;
	if (position.getY() <= canionPosY) // Si esta por encima del canion entonces su direccion puede cambiar hacia los lados dependiendo de su posicion respecto al canion.
	{
		if (position.getX() < canionPosX) // k <  c
		{
			direction = 1; // Va a la derecha.
		}
		else if (position.getX() > canionPosX) // c  >  k
		{
			direction = -1; // Va a la izquierda.
		}
	}

	// Movimiento.
	position = position + Vector2D(velocidadKamikaze.getX() * direction, velocidadKamikaze.getY());

	// Actualiza posicion del rect.
	rect.x = position.getX();
	rect.y = position.getY();
	std::cout << position.getX() << " :x,y:" << position.getY() << std::endl;
	std::cout <<" direction:" << direction << std::endl;
}