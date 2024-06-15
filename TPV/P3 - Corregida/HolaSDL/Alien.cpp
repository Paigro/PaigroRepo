#include "checkML.h"
#include "Alien.h"
#include "PlayState.h"
#include "SDLApplication.h"

using namespace std;

Alien::Alien(PlayState* gam, Point2D<double> pos, int sub, const Texture* tex, Mothership* mot) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	subtipo(sub),
	mothership(mot)
{
	posYAnt = pos.getY();
}

void Alien::update()
{
	move = mothership->shouldMove();

	if (move)
	{
		animation();

		position = Vector2D<double>((position.getX() + (mothership->getDirection() * velocidadAlien)), posYAnt + mothership->getLevel() * 20); // Actualizacion del movimiento y direccion.

		// Actualizacion de la posicion del rect.
		rect.y = position.getY();
		rect.x = position.getX();

		// Choque con un borde.
		if (position.getX() >= (SCRWIDTH - texture->getFrameWidth()) || position.getX() <= 0)
		{
			mothership->canNotMove(); // Cuando choca con los bordes de la pantalla.
		}

		// Comprueba si ha landeado.
		if (position.getY() >= playST->getCannonYPos())
		{
			mothership->alienLanded();
		}
	}
}

void Alien::render() const
{
	texture->renderFrame(rect, subtipo, renderFrame);
}

bool Alien::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != entity)
	{
		if (SDL_HasIntersection(&rect, &_rect))
		{
			switch (subtipo)
			{
			case 0:
				playST->addScore(30);
				break;
			case 1:
				playST->addScore(20);
				break;
			case 2:
				playST->addScore(10);
				break;
			default:
				break;
			}
			playST->hasDied(scAnch, objAnch);
			mothership->alienDied();
			return true;
		}
	}
	return false;
}

void Alien::save(ostream& fil) const // Guarda: tipo-posicion-subtipo.
{
	fil << ID_ALIEN << " " << position.getX() << " " << position.getY() << " " << subtipo << " " << "\n";
}