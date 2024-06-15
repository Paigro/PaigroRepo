#pragma once
#include "GameObject.h"
#include "gameList.h"
#include "Vector2D.h"
#include "texture.h"

class SceneObject : public GameObject
{
protected:
	PlayState* playST = nullptr; // Referencia al PlayState.

	Point2D<double> position; // Posicion del elemento.
	
	const Texture* texture = nullptr; // Textura del elemento.
	int width; // Anchura de la textura.
	int height; // Altura de la textura.
	
	SDL_Rect rect; // Rectangulo del elemento.

	GameList<SceneObject>::anchor scAnch; // Iterador identificador.


public:

	SceneObject(GameState* state, Point2D<double> pos, int wid, int hei, const Texture* tex);
	SceneObject(PlayState* plST, Point2D<double> pos, int wid, int hei, const Texture* tex); // Constructora.

	// Metodos heredados
	virtual void update();
	virtual void render() const;
	virtual void save(std::ostream& fil) const;
	SDL_Rect getRect();

	virtual bool hit(SDL_Rect _rect, char c);

	virtual void setListAnchor(const GameList<SceneObject, false>::anchor& anc) { scAnch = anc; }
	virtual void hola() { std::cout << "Hola." << std::endl; };
};

