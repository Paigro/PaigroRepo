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

	GameList<SceneObject>::anchor scAnch; // Anchor identificador.

public:

	//------Constructoras / destructoras:

	// Constructora de SceneObject que recibe un estado cualquiera.
	SceneObject(GameState* state, Point2D<double> pos, int wid, int hei, const Texture* tex);
	// Constructora de SceneObject que recibe un PlayState.
	SceneObject(PlayState* plST, Point2D<double> pos, int wid, int hei, const Texture* tex);
	// Destructora de SceneObject.
	//~SceneObject();


	//------Metodos heredados:

	// Update de SceneObject.
	virtual void update();
	// Render de SceneObject.
	virtual void render() const;
	// Save de SceneObject.
	virtual void save(std::ostream& fil) const;


	//------Metodos de la clase:

	// Devuelve el rectangulo de la entidad.
	SDL_Rect getRect();
	// Hit de SceneObject.
	virtual bool hit(SDL_Rect _rect, char c);


	//------Getters y setters:

	// Setea el anchor del sceneObjet.
	virtual void setListAnchor(const GameList<SceneObject, false>::anchor& anc) { scAnch = anc; }
};