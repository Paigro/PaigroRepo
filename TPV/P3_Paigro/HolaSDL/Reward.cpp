#include "checkML.h"
#include "Reward.h"
#include "PlayState.h"
#include "SDLApplication.h"
#include "SceneObject.h"
#include "SDL.h"

Reward::Reward(PlayState* playST, Point2D<double> pos, SDLEventCallback rew, Texture* _tex) :
	SceneObject(playST, pos, _tex->getFrameWidth(), _tex->getFrameHeight(), _tex),
	rewardCallback(rew)
{

}

void Reward::update()
{
	// Actualizacion de la posicion.
	position = position + Point2D<double>(0, velocidadReward);

	// Actualizacion del rect.
	rect.x = position.getX();
	rect.y = position.getY();

	// Salida de limites del reward.
	if (position.getY() <= 0 || position.getY() >= SCRHEIGHT + texture->getFrameHeight())
	{
		playST->hasDied(scAnch, objAnch);
	}

	// Si se puede otorgar el reward.
	if (playST->mayGrantReward(rect))
	{
		rewardCallback();
		playST->hasDied(scAnch, objAnch);
	}
}

void Reward::render() const
{
	texture->render(rect);
}

bool Reward::hit(SDL_Rect _rect, char c)
{
	if ((&_rect) != (&rect) && c != entity && SDL_HasIntersection(&rect, &_rect))
	{
		//cout << "Reward: hit." << endl;
		return true;
	}
	return false;
}