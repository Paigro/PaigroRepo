#pragma once

#include "Date.h"


class ProssrranDate : public Date
{
private:

protected:

	int phase; // Etapa del anyo Prossrrano.

public:

	//------Constructoras y destructoras:

	// Constructora base de ProssrranDate. Pone todo a -1.
	ProssrranDate();
	// Constructora por parametros de ProssrranDate.
	ProssrranDate(int d, int m, int y, int ph);


	//------Metodos publicos de ProssrranDate:

	// Devuelve si la fecha es correcta o no.
	bool isCorrect() const;


	//------Operadores:

	// Operador ++. Va sumando dias haciendo los cambios necesarios entre meses, etapas y anyos.
	void operator++();
	// Operador --. Va restando dias haciendo los cambios necesarios entre meses, etapas y anyos.
	void operator--();


	//------Getters y setters:

	// Devuelve la etapa.
	int getPhase() { return phase; }
};