#pragma once

class Weapon
{
private:

	char entity; // Char que identifica al Weapon.

public:

	Weapon(char ent) :
		entity(ent)
	{

	}

	// Devuelve el identificador de la entidad/weapon.
	char getEntityType()
	{
		return entity;
	}
};