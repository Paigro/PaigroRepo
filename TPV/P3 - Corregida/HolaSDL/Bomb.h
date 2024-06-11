#pragma once
#include "SceneObject.h"
#include "texture.h"
#include "Weapon.h"

constexpr int ID_BOMBA = 8;

class Bomb : public SceneObject, public Weapon
{
private:
	char entity;
	int vidas = 2;
	SDL_Renderer* renderer = nullptr;
	Texture* tex;


public:

	//Constructoras / destructoras
	Bomb(PlayState* playST, Point2D<double> pos, int vid, char ent);
	//~Bomb();

	// Metodos heredados.
	void update() override;
	void render() const override;
	bool hit(SDL_Rect rect, char c) override;
	void save(std::ostream& fil) const override;
};