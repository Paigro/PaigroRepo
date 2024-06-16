#pragma once
#include "SceneObject.h"

constexpr int ID_BUNKER = 4; // ID de la entidad Bunker.

class Bunker : public SceneObject
{
private:

	int lives = 4; // Vidas que tiene eñ bunker.
	int maxLives = 4; // Maximo de vidas que puede tener el bunker.
	char entity = 'b'; // Char que identifica esta entidad.

public:

	//------Constructoras y destructoras:

	// Constructora de Bunker.
	Bunker(PlayState* gam, int liv, Point2D<double> pos, const Texture* tex);
	// Desstructora de Bunker.
	//~Bunker();
	

	//------Metodos heredados:
	
	// Update de Bunker.
	void update() override;
	// Render de Bunker.
	void render() const override;
	// Hit de Bunker.
	bool hit(SDL_Rect rect, char c) override;
	// Save de Bunker.
	void save(std::ostream& fil) const override;
};

