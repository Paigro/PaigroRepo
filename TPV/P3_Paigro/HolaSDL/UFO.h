#pragma once
#include "SceneObject.h"

constexpr double TIEMPOAPARICION = 100; // Tiempo de aparicion del UFO.
constexpr int MAX_APPEARANCE_PERCENTAJE = 10; // Porcentaje maximo de aparicion de objetos (bomba o escudo).
constexpr int ID_UFO(5); // ID de la entidad UFO.

class UFO : public SceneObject
{
private:

	enum  states { OCULTO, VISIBLE, DESTRUIDO }; // Enum de los diferentes estados de la nave.
	states UFOstate = OCULTO; // Estado en el que se encuentra el UFO.
	char entity = 'a'; // Char que identifica a la entidad.
	double appearCountDown = 0; // Contador para que vuelva a aparecer.
	double aprearanceTime; // Tiempo para que vuelva a aparecer (OCULTO -> VISIBLE).
	Point2D<double>posInicial; // Posicion inicial del UFO.
	int destroyTimer = 0; // Timer para que el sprite del UFO destruido se quede en pantalla un poco.
	int maxDestroyedTime = 7; // Maximo tiempo que va a estar el UFO con el Sprite de destruido.
	bool reward = false;

public:

	//------Constructoras / destructoras:

	// Constructora de UFO.
	UFO(PlayState* gam, Point2D<double> pos, const Texture* tex, int sta, int eTime);	
	// Destructora de UFO.
	//~UFO();
	

	//------Metodos heredados:

	// Update de UFO.
	void update() override;
	// Render de UFO.
	void render() const override;
	// Hit de UFO.
	bool hit(SDL_Rect rect, char c)override;
	// Save de UFO.
	void save(std::ostream& fil) const override;


	//------Metodos de la clase:

	// Resetea las debidas cosas dependiendo del estado en el que se encuentre.
	void reset();
};

