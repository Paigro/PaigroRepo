#include "checkML.h"
#include "ShooterAlien.h"
#include "PlayState.h"

ShooterAlien::ShooterAlien(PlayState* gam, Point2D<double> pos, int sub, const Texture* tex, Mothership* mot, double scd) :
	Alien(gam, pos, sub, tex, mot),
	shootCountDown(scd)
{
	reloadTime = setTime();
	shootCountDown = playST->getRandomRange(minShootTime, reloadTime); // Porque si, creo que puede quedar bien.
}

void ShooterAlien::update()
{
	Alien::update();

	if (shootCountDown >= reloadTime)
	{
		playST->fireLaser(position, 'a');
		shootCountDown = 0.0;
		reloadTime = setTime();
	}
	shootCountDown++;
}

double ShooterAlien::setTime() const
{
	return playST->getRandomRange(minShootTime, maxShootTime);
}

void ShooterAlien::save(std::ostream& fil) const // Guarda: tipo-posicion-subitpo-tiempoParaDisparar.
{
	fil << ID_SHOOTERALIEN << " " << position.getX() << " " << position.getY() << "  " << 0 << " " << shootCountDown << "\n";
}