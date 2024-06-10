#pragma once

#include "SceneObject.h"
#include "texture.h"
#include "Weapon.h"
#include "Vector2D.h"

const Vector2D<double> velocidadKamikaze(5.0, 5.0);
const double timeToMove = 20;
class Kamikaze : public SceneObject, public Weapon
{
public:

	//Constructoras / destructoras
	Kamikaze(PlayState* gam, Point2D<double> pos, const Texture* tex, char c);
	//~Alien();

	// Metodos heredados.
	void update() override;
	void render() const override;
	bool hit(SDL_Rect rect, char c) override;
	void save(std::ostream& fil) const override;

	void updatePosition();

private:

	int direction; // Direcciones: -1 (izquierda), 0 (parado), 1 (derecha).
	double elapsedMove = 0;
};

