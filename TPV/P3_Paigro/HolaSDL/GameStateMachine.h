#pragma once
#include "GameState.h"
#include "MainMenuState.h"
#include "PlayState.h"
#include "ScrollingState.h"
#include "ScreenSaverState.h"

#include <iostream>
#include <stack>
#include <list>

class GameStateMachine
{
protected:

	std::stack<GameState*> pilaEstados; // Pues la pila de los estados.
	std::stack<GameState*> eliminaEstados; // Pila de estados para eliminar.

public:

	//------Constructoras y destructoras:

	// Construcora de GameStateMachine.
	GameStateMachine();
	// Destructora de GameStateMachine.
	~GameStateMachine();


	//------Metodos para manejar estados.

	// Mete estado sin eliminar el anterior.
	void pushState(GameState* pState); 
	// Sustituye el estado anterior por uno nuevo.
	void replaceState(GameState* pState); 
	// Elimina el estado actual sin reemplazarlo por otro.
	void popState(); 
	// Elimina los estados de la pila de estados a eliminar.
	void deleteStates();


	//------Metodos que hacen cosas.

	// Update de GameStateMachine.
	void update();
	// Render de GameStateMachine.
	void render() const;
	// HandleEvent de GameStateMachine.
	void handleEvent(const SDL_Event& event);
};