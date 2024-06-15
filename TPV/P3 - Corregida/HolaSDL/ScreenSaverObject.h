#pragma once

#include "Vector2D.h"
#include "texture.h"
#include "SceneObject.h"

class ScreenSaverObject : public SceneObject
{

public:

	// Constructoras:
	ScreenSaverObject(GameState* gam, Point2D<double> pos, const Texture* tex);

	// Metodos heredados.
	void update() override;
	void render() const override;
	bool hit(SDL_Rect rect, char c) override;
	void save(std::ostream& fil) const override;

	Point2D<double> getPos() { return position; };

	void move();
	void checkLimits();

private:

	bool sayHello;
	int angle;
	int dirX;
	int dirY;
};