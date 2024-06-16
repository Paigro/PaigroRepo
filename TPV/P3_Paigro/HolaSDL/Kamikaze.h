#pragma once

#include "SceneObject.h"
#include "texture.h"
#include "Weapon.h"
#include "Vector2D.h"

const Vector2D<double> velocidadKamikaze(5.0, 10.0); // Velocidad del kamikaze.
const double TIME_TO_MOVE = 50; // Tiempo que tiene que esperar para moverse.

class Kamikaze : public SceneObject, public Weapon
{
private:

	int direction; // Direcciones: -1 (izquierda), 0 (parado), 1 (derecha).
	double moveCountDown; // Contador para que se pueda mover.
	int damage = 2; // Danyo que hace a las entidades contra las que colisiona.

public:

	//------Constructoras / destructoras:

	// Constructora de Kamikaze.
	Kamikaze(PlayState* gam, Point2D<double> pos, const Texture* tex, char c);
	// Destructora de Kamikaze.
	//~Kamikaze();


	//------Metodos heredados:

	// Update de Kamikaze.
	void update() override;
	// Render de Kamikaze.
	void render() const override;
	// Hit de Kamikaze.
	bool hit(SDL_Rect rect, char c)override;
	// Save de Kamikaze.
	void save(std::ostream& fil) const override;


	//------Metodos de la clase:

	// Actualiza la posicion del kamikaze cuando deba.
	void updatePosition();
};