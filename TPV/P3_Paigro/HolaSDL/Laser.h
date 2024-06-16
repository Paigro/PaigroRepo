#pragma once
#include "SceneObject.h"
#include "SDL.h"
#include "Weapon.h"


constexpr int ID_LASER = 6; // ID de la entidad Laser.

constexpr int COL_CANNON_R(255), COL_CANNON_G(128), COL_CANNON_B(0),
COL_ALIEN_R(53), COL_ALIEN_G(255), COL_ALIEN_B(255),
WIDTH_LASER(3), HEIGHT_LASER(21);

class Laser : public Weapon, public SceneObject
{
private:

	char entity; // Identificador que coje de Weapon.
	SDL_Renderer* renderer = nullptr; // Referencia al renderer.
	SDL_Color color; // Color que va a tener el laser.
	Vector2D<double> velocidad; // Velocidad del laser.

	bool fuera = false; // Si esta fuera de los limites.

public:

	//------Constructoras / destructoras:

	// Constructora de Laser.
	Laser(PlayState* playST, Point2D<double> pos, char ent);
	// Destructora de Laser.
	//~Laser();


	//------Metodos heredados:

	// Update de Laser.
	void update() override;
	// Render de Laser.
	void render() const override;
	// Hit de Laser.
	bool hit(SDL_Rect rect, char c)override;
	// Save de Laser.
	void save(std::ostream& fil) const override;


	// Hace el rectangulo con el color que sea.
	void renderRect() const;
};