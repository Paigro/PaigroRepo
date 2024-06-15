#pragma once
#include "SceneObject.h"
#include "texture.h"
#include "Weapon.h"

constexpr int ID_BOMBA = 8; // ID de la entidad Bomba.

class Bomb : public SceneObject, public Weapon
{
private:

	char entity; // Guarda el char de Weapon que identifica esta entidad.
	int vidas = 2; // Vidas que tiene la bomba.

public:

	//------Constructoras y destructoras:

	// Constructora de Bomb.
	Bomb(PlayState* playST, Point2D<double> pos, int vid, char ent);
	// Destructora de Bomb.
	//~Bomb();


	//------Metodos heredados:

	// Update de Bomb.
	void update() override;
	// Render de Bomb.
	void render() const override;
	// Hit de Bomb.
	bool hit(SDL_Rect rect, char c) override;
	// Save de Bomb.
	void save(std::ostream& fil) const override;
};