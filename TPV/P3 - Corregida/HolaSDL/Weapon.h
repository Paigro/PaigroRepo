#pragma once

#include "Vector2D.h"
#include "texture.h"
#include "SceneObject.h"
#include "Mothership.h"

class Weapon
{
private:

	char entity;

public:

	Weapon(char ent)
		:entity(ent)
	{}

	char getEntityType()
	{
		return entity;
	}
};