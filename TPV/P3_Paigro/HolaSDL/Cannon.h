#pragma once
#include "SceneObject.h"
#include "EventHandler.h"

const double TIEMPODISPARO = 25; // Tiempo que hay que esperar para poder disparar.
constexpr int ID_CANNON = 0; // ID de la entidad Cannon.

class Cannon : public EventHandler, public SceneObject
{
private:

	int lives = 3; // Numero de vidas del cannon.
	int direction = 0; // Direcciones: -1 (izquierda), 0 (parado), 1 (derecha).
	double shootTimer = 0; // Contador para el disparo.
	char entity = 'c'; // Char que define el cannon.


	//------Parametros invencibilidad:

	bool invincible = false; // Si es invencible o no.
	int timer = 0; // Contador para la invencibilidad.
	int maxTimer = 200; // Tiempo maximo que puede ser invencible.

public:

	//------Constructoras / destructoras:

	// Constructora de Cannon.
	Cannon(PlayState* gam, Point2D<double> pos, const Texture* tex, int liv, int eTime);
	// Destructora de Cannon.
	//~Cannon();


	//------Metodos heredados:

	// Update del cannon.
	void update() override;
	// Render del cannon.
	void render() const override;
	// Hit del cannon.
	bool hit(SDL_Rect rect, char c)override;
	// Save del cannon.
	void save(std::ostream& fil) const override;
	// HandleEvent del cannon.
	void handleEvent(const SDL_Event& event) override;


	//------Metodos de clase:

	// Vuelve invencible al cannon.
	void setInvincible();

	//------Getters:

	// Devuelve las vidas de la nave.
	int getLives() const { return lives; }
	// Devuelve la posicion de la nave.
	Point2D<double> getPos() const { return position; }
};