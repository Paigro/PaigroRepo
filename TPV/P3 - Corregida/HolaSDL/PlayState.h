#pragma once
#include "SDL.h"
#include "Alien.h"
#include "Mothership.h"
#include "UFO.h"
#include "texture.h"
#include "Vector2D.h"
#include "Cannon.h"
#include "Bunker.h"
#include "Laser.h"
#include "Bomb.h"
#include "Reward.h"
#include "ShooterAlien.h"
#include "InfoBar.h"
#include "SceneObject.h"
#include "Weapon.h"
#include "Kamikaze.h"

#include "GameState.h"
#include "EventHandler.h"

#include "InvadersError.h"
#include "SDLError.h"
#include "FileFormatError.h"
#include "FileNotFoundError.h"

#include <vector>
#include <array>
#include <random>
#include <list>
#include <iterator>
#include <iostream>
#include <fstream>
#include <random>

//using namespace std;

const std::string MAP_PATH = "assets/maps/";


const double velocidadAlien = 5;
const Vector2D<double> velocidadBomb(0, 5);
const double velocidadCannon = 10;
const Vector2D<double> velocidadLaser(0, 5);
const int proporcionBombas = 5;
const int velocidadReward = 4;

class PlayState : public GameState
{
private:
	
	GameList<SceneObject> entities; // Lista de SceneObjects de las entidades del juego.
	SDL_Renderer* renderer;


	Cannon* canion = nullptr; // Referencia a la nave.
	Mothership* mother = new Mothership(this, getGame()); // Referencia a la mothership.
	InfoBar* info = nullptr; // Referencia al infobar.
	
	std::mt19937_64 randomGenerator; // Generador de numeros aleatorios.

	
	std::string map = MAP_PATH; // La ruta hasta los mapas.
	int score = 0; // Score de la partida.

	void readMap();
	void addSceneObject(SceneObject* obj);

public:
	// Constructora.
	PlayState(SDLApplication* _sdlApp, bool guardado);


	//------Metodos overrided:

	// Update.
	void update() override;
	// Render.
	void render() const override;
	// HandleEvent.
	void handleEvent(const SDL_Event& event) override;
	// Save.
	void save(std::ostream& fil) const override;


	//------Estados:

	// Cuando entra a este estado.
	bool onEnter() override;
	// Cuando sale de este estado.
	bool onExit() override;
	// Devuelve el ID de este estado.
	std::string getStateID() const override { return"PlayST"; }
	// Cambia al estado GameOver.
	void gameOver();


	//------Metodos de clase:

	// Comprueba si una entidad con rect _rect puede chocar con una entidad con char c.
	bool damage(SDL_Rect _rect, Weapon c);
	// Mata una entidad.
	void hasDied(GameList<SceneObject, false>::anchor scAnch, GameList<GameObject, true>::anchor objAnch);
	// Dispara un laser desde position y con propietario c.
	void fireLaser(const Point2D<double>& position, char c);
	// Dispara una bomba desde position.
	void fireBomb(const Point2D<double>& position);
	// Dispara un reward desde position.
	void fireReward(const Point2D<double>& position);
	// Dispara un kamikaze desde position.
	void fireKamikaze(const Point2D<double>& position);
	// Comprueba si el reward ha chocado con la nave.
	bool mayGrantReward(SDL_Rect rect);
	// Guardado de la partida.
	void saveGame();
	// Cargado de una partida.
	void cargado();
	// Hace a la nave invencible.
	void invencible() { canion->setInvincible(); }
	// Suma points al score.
	void addScore(int points) { score += points; }


	//------Getters:
	
	// Devuelve un numero aleatorio entre min y max.
	int getRandomRange(int min, int max);
	// Devuelve las vidas que tiene la nave.
	int getCannonLives() const { return canion->getLives(); }
	// Devuelve la posicion de la nave.
	const Point2D<double> getCanonPos();
	// Devuelve la posicion en X de la nave.
	const double getCannonXPos() const { return canion->getPos().getX(); } 
	// Devuelve la posicion en Y de la nave.
	const double getCannonYPos() const { return canion->getPos().getY(); } 
	// Devuelve el score de la partida.
	int returnScore() const { return score; }

	//------Examenes de teoria:

	// Para los examenes de teoria.
	void teoria();
};