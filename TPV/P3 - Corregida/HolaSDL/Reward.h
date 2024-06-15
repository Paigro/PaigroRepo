#pragma once
#include "SceneObject.h"
#include "checkML.h"
#include "Cannon.h"
#include <functional> 
#include "texture.h"

using SDLEventCallback = std::function<void(void)>;

class Reward :public SceneObject
{
private:

	char entity = 'r'; // Char para identificar la entidad.
	SDL_Renderer* renderer = nullptr; // Renferencia al renderer.
	SDLEventCallback rewardCallback; // Callback que ocurre cuando se coje el reward.

public:

	//------Constructoras / destructoras:

	// Constructora de Reward.
	Reward(PlayState* playST, Point2D<double> pos, SDLEventCallback rew, Texture* _tex);
	// Destructora de Reward.
	//~Reward();


	//------Metodos heredados:

	// Update de Reward.
	void update() override;
	// Render de Reward.
	void render() const override;
	// Hit de Reward.
	bool hit(SDL_Rect rect, char c)override;
};