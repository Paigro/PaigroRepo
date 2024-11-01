#include "checkML.h"
#include "Laser.h"
#include "PlayState.h"
#include "SDLApplication.h"
#include "SDL.h"

using namespace std;

Laser::Laser(PlayState* playST, Point2D<double> pos, char ent) :
	SceneObject(playST, pos, WIDTH_LASER, HEIGHT_LASER, nullptr),
	Weapon(ent),
	velocidad(velocidadLaser), renderer(playST->getGame()->getRenderer())
{
	fuera = false;

	entity = getEntityType();

	// Guardamos el color que sea.
	if (entity == 'c') // Color del cannon.
	{
		color.r = COL_CANNON_R;
		color.g = COL_CANNON_G;
		color.b = COL_CANNON_B;
	}
	else // Color del alien.
	{
		color.r = COL_ALIEN_R;
		color.g = COL_ALIEN_G;
		color.b = COL_ALIEN_B;
	}
}

//Laser::~Laser(){}

void Laser::update()
{
	if (entity == 'a') // Disparo de Alien.
	{
		position = position + velocidad;
	}
	else if (entity == 'c') // Disparo de cannon.
	{
		position = position - velocidad;
	}
	// Actualizacion del rect.
	rect.x = position.getX();
	rect.y = position.getY();

	// Salida de limites de la bala.
	if (position.getY() <= 0 || position.getY() >= SCRHEIGHT + HEIGHT_LASER)
	{
		playST->hasDied(scAnch, objAnch);
		fuera = true;
	}
	// Comprueba si la bala choca. 
	// NOTA: He puesto que no este fuera porque con el UFO a veces puede darse que salga y golpee al UFO a la vez y da error.
	if (!fuera && playST->damage(rect, entity))
	{
		playST->hasDied(scAnch, objAnch);
	}
}

void Laser::render() const
{
	renderRect();
}

void Laser::renderRect() const
{
	SDL_SetRenderDrawColor(renderer, color.r, color.g, color.b, color.a);
	SDL_RenderFillRect(renderer, &rect);
}

bool Laser::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != entity && SDL_HasIntersection(&rect, &_rect))
	{
		return true;
	}
	return false;
}

void Laser::save(ostream& fil) const // Guarda: tipo-posicion-quienHaDisparado.
{
	fil << ID_LASER << " " << position.getX() << " " << position.getY() << " " << entity << "\n";
}