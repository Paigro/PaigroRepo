#pragma once
#include <SDL.h>
#include <functional>

#include "GameObject.h"
#include "EventHandler.h"
#include "texture.h"
#include "Vector2D.h"
#include "GameState.h"


using SDLEventCallback = std::function<void(void)>;

class Button : public EventHandler, public GameObject
{
private:

	// Enum de los estados en los que puede estar el boton.
	enum button_state 
	{
		MOUSE_OUT = 0, // Raton fuera.
		MOUSE_OVER = 1, // Raton encima.
		CLICKED = 2 // Boton clickado.
	};

	SDL_Point point;	// Guarda la posicion del cursor en click.
	SDL_Rect destRect;	// Rectangulo del render.

	std::list<SDLEventCallback> eventsCB; // Lista de callbacks.
	Point2D<double> position; // Posicion del boton.
	Texture* texture; // Textura del boton.
	int currentFrame; // Frame actual del boton.

	// Hace los callbacks.
	void emit() const;

public:

	//------Constructoras y destructoras:

	// Constructora de Button.
	Button(GameState* gamSt, Texture* tex, Point2D<double> pos);
	// Destructora de Button.
	//~Button();


	//------Metodos heredados:

	// Render de Bunker.
	void render() const override;
	// Update de Bunker.
	void update() override;
	// HandleEvent de Bunker.
	void handleEvent(const SDL_Event& event) override;
	// Save de Bunker.
	void save(std::ostream& fil) const override{} ;

	// Mete un callback dado a la lista de callbacks del boton.
	void connectButton(SDLEventCallback buttonCallback);
};

