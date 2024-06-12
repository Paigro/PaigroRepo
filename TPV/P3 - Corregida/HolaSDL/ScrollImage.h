#pragma once

#include "SceneObject.h"
#include "Vector2D.h"

const double SCROLL_IMAGE_SPEED = 3.0;

class ScrollImage : public SceneObject
{
public:

	// Constructora.
	ScrollImage(GameState* state, Point2D<double> pos, const Texture* tex);
	
	// Devuelve si ha llegado al final de la imagen.
	bool  getFinish() { return finish; }

private:


	//------Metodos heredados:

	// Update.
	void update() override;
	// Render.
	void render() const override;
	// Hit.
	bool hit(SDL_Rect rect, char c) override;
	// Save.
	void save(std::ostream& fil) const override;

	// Comprueba si la imagen ha salido por arriba de la pantalla.
	bool isOut();
	// Mueve la imagen.
	void move();

	bool finish = false; // Guarda si la imagen ha llegado al final.
};