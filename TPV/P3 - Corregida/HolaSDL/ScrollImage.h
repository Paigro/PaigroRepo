#pragma once

#include "SceneObject.h"
#include "Vector2D.h"

class ScrollImage : public SceneObject
{
public:

	// Constructora.
	ScrollImage(GameState* state, Point2D<double> pos, const Texture* tex);

private:

	//------Metodos heredados:


	void update() override;
	void render() const override;
	bool hit(SDL_Rect rect, char c) override;
	void save(std::ostream& fil) const override;
};