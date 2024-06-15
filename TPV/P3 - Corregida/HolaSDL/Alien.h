#pragma once

#include "Vector2D.h"
#include "texture.h"
#include "SceneObject.h"
#include "Mothership.h"

constexpr int ID_ALIEN = 1; // ID de la entidad Alien.

class Alien : public SceneObject
{
private:

	int subtipo; // Subtipo de alien.
	Mothership* mothership = nullptr; // Puntero a mothership.
	double posYAnt = 0; // Posicion Y anterior.
	char entity = 'a'; // Char que identifica la entidad.

	bool move = false; // Si el Alien se puede mover o no.

	int renderFrame = 0; // Frame en el que se encuentra el Alien.

	// Cambiar el renderFrame.
	void animation() { renderFrame == 0 ? renderFrame = 1 : renderFrame = 0; }

public:

	//------Constructoras y destructoras:

	// Constructora de Alien.
	Alien(PlayState* gam, Point2D<double> pos, int sub, const Texture* tex, Mothership* mot);
	// Destructora de Alien.
	//~Alien();

	//------Metodos heredados:

	// Update del Alien.
	void update() override;
	// Render del Alien.
	void render() const override;
	// Hit del Alien.
	bool hit(SDL_Rect rect, char c) override;
	// Save del Alien.
	void save(std::ostream& fil) const override;
};