#pragma once

#include "SceneObject.h"
#include "Vector2D.h"

const double SCROLL_IMAGE_SPEED = 3.0; // Velocidad a la que se va a mover la imagen de scroll.

class ScrollImage : public SceneObject
{
private:

	bool finish = false; // Guarda si la imagen ha llegado al final.

	//------Metodos privados de la clase:

	// Comprueba si la imagen ha salido por arriba de la pantalla.
	bool isOut();
	// Mueve la imagen.
	void move();

public:

	//------Constructoras / destructoras:

	// Constructora de ScrollImage.
	ScrollImage(GameState* state, Point2D<double> pos, const Texture* tex);
	// Destructora de ScrollImage.
	//~ScrollImage();

	//------Metodos heredados:

	// Update de ScrollImage.
	void update() override;
	// Render de ScrollImage.
	void render() const override;

	//------Getters y setters:


	// Devuelve si ha llegado al final de la imagen.
	bool getFinish() { return finish; }

};