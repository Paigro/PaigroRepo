#pragma once
#include "GameObject.h"
#include "Vector2D.h"
#include "texture.h"


const int MAX_DIGITS = 4; // Constante para el maximo numero de digitos de la puntuacion
const int MAX_CANNON_LIVES = 3; // Vidas maximas del cannon.
const int DIGIT_DIV = 10; // Divisor de digitos
const int DIGIT_PITH = 50; // Separacion de digitos.
const int X_OFFSET = 400; // Offset para que empiecen en el lado derecho y abajo las cifras de la puntuacion
const int Y_OFFSET = 10; // Offset para que empiecen en el lado derecho y abajo las cifras de la puntuacion

const int ID_INFOBAR = 7; // ID de la entidad InfoBar.

class InfoBar : public GameObject
{
private:

	int score; // Puntuacion del jugador.
	Point2D<double> position; // Posicion del InfoBar.
	PlayState* playST; // Referencia al PlayState.
	int cannonLives; // Vidas de la nave.
	Texture* canTexture; // Textura de la nave.
	Texture* numTexture; // Textura de numeros.

	SDL_Rect canVid[MAX_CANNON_LIVES];
	SDL_Rect cifrPunt[MAX_DIGITS];

public:

	//------Constructoras / destructoras:

	// Constructora de InfoBar.
	InfoBar(PlayState* plST, SDLApplication* appl, Point2D<double> pos, int scr);
	// Destructora de InfoBar.
	//~InfoBar();


	//------Metodos heredados:

	// Update de InfoBar.
	void update() override;
	// Render de InfoBar.
	void render() const override;
	// Save de InfoBar.
	void save(std::ostream& fil) const override;
};

