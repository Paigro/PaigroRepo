#pragma once
#include "Alien.h"

constexpr int ID_SHOOTERALIEN = 2; // ID de la entidad ShooterAlien.

class ShooterAlien : public Alien
{
private:
	double reloadTime; // Tiempo de recarga del disparo.
	double maxShootTime = 800; // Maximo tiempo que puede estar recargando.
	double minShootTime = 200; // Minimo tiempo que puede estar recargando.
	double shootCountDown; // Contador para disparar.

public:

	//------Constructoras / destructoras:

	// Constructora de ShooterAlien.
	ShooterAlien(PlayState* gam, Point2D<double> pos, int sub, const Texture* tex, Mothership* mot, double scd);
	// Destructora de ShooterAlien.
	//~ShooterAlien();


	//------Metodos heredados:

	// Update de ShooterAlien.
	void update() override;
	// Save de ShooterAlien.
	void save(std::ostream& fil) const override;
	
	
	//------Metodos de la clase:
	
	//Devuelve un tiempo aleatorio entre el min y max para el siguiente tiempo de recarga.
	double setTime() const;

};