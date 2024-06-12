#pragma once
#include "SceneObject.h"
#include "SDL.h"
#include "Weapon.h"


constexpr int
ID_LASER(6),
COL_CANNON_R(255), COL_CANNON_G(128), COL_CANNON_B(0),
COL_ALIEN_R(53), COL_ALIEN_G(255), COL_ALIEN_B(255),
WIDTH_LASER(3), HEIGHT_LASER(21);

class Laser : public Weapon, public SceneObject
{
private:

	char entity;
	SDL_Renderer* renderer = nullptr;
	SDL_Color color;
	Vector2D<double> velocidad;

	bool fuera = false;

public:

	// Constructoras / destructoras
	Laser(PlayState* playST, Point2D<double> pos, char ent);
	//~Laser();

	// Metodos heredados.
	void update() override;
	void render() const override;
	bool hit(SDL_Rect rect, char c) override;
	void save(std::ostream& fil) const override;

	// Metodos de clase.
	void renderRect() const;
};