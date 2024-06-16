#pragma once
// Cosas de SDL:
#include "SDL.h"
// Cosas importantes?:
#include "texture.h"
// Estados:
#include "GameStateMachine.h"
#include "MainMenuState.h"
#include "PlayState.h"
#include "EndState.h"
#include "PauseState.h"
// Errores:
#include "InvadersError.h"
#include "SDLError.h"
#include "FileFormatError.h"
#include "FileNotFoundError.h"

#include <vector>
#include <array>


const std::string TEXTURE_ROOT = "assets/images/"; // Direccion donde estan las texturas.
const int NUM_TEXTURES = 23; // Numero de texturas.

const double SCRWIDTH = 800; // ANCHO de la partida (x).
const double SCRHEIGHT = 600; // ALTO de la partida (y).


const double FRAMERATE = 60;
const double TIMEBETWEENFRAMES = 1000 / FRAMERATE;

// Enum de nombres de texturas.
// NOTA: el UFO se llama UFOT para no confundirlo con la clase.
enum TextureName {
	ALIENS, BUNKER, SPACESHIP, STARS, UFOT, BOMB, NUMS, MENUFONDO, NUEVAP,
	CARGARP, SALIR, CONTINUARP, GUARDARP, FONDOP, VOLVERM, GOV, WIN, SHIELD,
	KAMIKAZE, SCROLL, SCROLLLOSE, SCROLLWIN, SCREENSAVER
};

class SDLApplication
{
private:

#pragma region Texturas

	struct textureInfo
	{
		std::string url;
		int rows;
		int cols;
	};

	textureInfo texturesList[NUM_TEXTURES]
	{

			textureInfo{"assets/images/aliens.png", 3, 2},
			textureInfo{"assets/images/bunker.png", 1, 4},
			textureInfo{"assets/images/spaceship.png", 1, 2},
			textureInfo{"assets/images/stars.png",1, 1},
			textureInfo{"assets/images/Ufo.png", 1, 2},
			textureInfo{"assets/objetos/bomb.png", 1, 1},
			textureInfo{"assets/images/numbers.png", 1, 10},
			textureInfo{"assets/fondos/mainMenu.png", 1,1},
			textureInfo{"assets/textos/nuevaPartida.png", 1,1},
			textureInfo{"assets/textos/cargarPartida.png", 1,1},
			textureInfo{"assets/textos/salir.png", 1,1},
			textureInfo{"assets/textos/continuar.png", 1,1},
			textureInfo{"assets/textos/guardarPartida.png", 1,1},
			textureInfo{"assets/fondos/pausaFondo.PNG", 1,1},
			textureInfo{"assets/textos/volverAlMenu.png", 1,1},
			textureInfo{"assets/textos/gameOver.png", 1,1},
			textureInfo{"assets/textos/hasGanado.png", 1,1},
			textureInfo{"assets/objetos/shield_reward.png", 1, 1},
			textureInfo{"assets/images/kamikaze.png", 1, 1},
			textureInfo{"assets/images/scroll.png", 1, 1},
			textureInfo{"assets/images/scrolllose.png", 1, 1},
			textureInfo{"assets/images/scrollwin.png", 1, 1},
			textureInfo{"assets/images/screenSave.png", 1, 1}

	};
#pragma endregion

	SDL_Window* window = nullptr;
	SDL_Renderer* renderer = nullptr;
	std::array<Texture*, NUM_TEXTURES> textures;

	// Maquina de estados
	GameStateMachine* stateMachine = new GameStateMachine();

	// Bucle de juego
	uint32_t frameTime;
	uint32_t startTime;
	bool endGame = false;
	bool _gameOver = false;

	void setupGame();

public:

	//------Constructoras y destructoras:

	// Construcora de SDLApplication.
	SDLApplication();
	// Destructora de SDLApplication.
	~SDLApplication();


	//------Metodos base:

	// Update de SDLApplication.
	void update() { stateMachine->update(); }
	// Render de SDLApplication.
	void render() const;
	// HandleEvents de SDLApplication.
	void handleEvents();


	//------Metodos de la clase:

	// Bucle del juego.
	void run();


	//------Getters y setters;
	
	// Devuelve la textura dado el nombre del enum.
	Texture* getTexture(TextureName _texNam) const { return textures[_texNam]; }
	// Devuelve el renderer.
	SDL_Renderer* getRenderer() const { return renderer; }
	// Devuelve la GameStateMachine.
	GameStateMachine* getStMachine() const { return stateMachine; }
	// Setea el endGame para cerrar la partida.
	void setEndGame(bool end);
};