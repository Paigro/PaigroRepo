#pragma once

#include "Vector2D.h"
#include "texture.h"
#include "SceneObject.h"

class ScreenSaverObject : public SceneObject
{
private:

	bool sayHello; // Si tiene que pararse a decir hola (voltereta).
	int angle; // Angulo que tiene.
	int dirX; // Direccion en X.
	int dirY; // Direccion en Y.

public:

	//------Constructoras / destructoras:

	// Constructora de ScreenSaverObject.
	ScreenSaverObject(GameState* gam, Point2D<double> pos, const Texture* tex);
	// Destructora de ScreenSaverObject.
	//~ScreenSaverObject();


	//------Metodos heredados:

	// Update de ScreenSaverObject.
	void update() override;
	// Render de ScreenSaverObject.
	void render() const override;


	//------Metodos de la clase:

	// Mueve el objeto.
	void move();
	// Comprueba la salida de los limites del objeto.
	void checkLimits();
};