#include "Bomb.h"
#include "checkML.h"
#include "PlayState.h"
#include "SDLApplication.h"
#include "SceneObject.h"
#include "SDL.h"

using namespace std;

Bomb::Bomb(PlayState* playST, Point2D<double> pos, int vid, char ent)
	: SceneObject(playST, pos, playST->getGame()->getTexture(BOMB)->getFrameWidth(), playST->getGame()->getTexture(BOMB)->getFrameHeight(), nullptr), vidas(vid),
	Weapon(ent)
{
	tex = playST->getGame()->getTexture(BOMB);
	entity = getEntityType();
}

//Bomb::~Bomb() {}

void Bomb::update()
{
	position = position + velocidadBomb;
	// Actualizacion del rect.
	rect.x = position.getX();
	rect.y = position.getY();

	// Salida de limites de la bala.
	if (position.getY() >= SCRHEIGHT - 10)
	{
		playST->hasDied(scAnch, objAnch);
	}

	// Comprueba si la bomba choca.
	if (playST->damage(rect, entity))
	{
		if (vidas <= 1)
		{
			playST->hasDied(scAnch, objAnch);
		}
		else
		{
			vidas--;
		}
	}

}

void Bomb::render() const
{
	tex->render(rect);
}

bool Bomb::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != entity && SDL_HasIntersection(&rect, &_rect))
	{
		return true;
	}
	return false;
}

void Bomb::save(ostream& fil) const // Guarda: tipo-posicion-vidas-quienHaDisparado.
{
	fil << ID_BOMBA << " " << position.getX() << " " << position.getY() << " " << vidas << " " << entity << "\n";
}