#include "checkML.h"
#include "UFO.h"
#include "PlayState.h"

UFO::UFO(PlayState* gam, Point2D<double> pos, const Texture* tex, int sta, int eTime) :
	SceneObject(gam, pos, tex->getFrameWidth(), tex->getFrameHeight(), tex),
	appearCountDown(eTime)
{
	switch (sta) // Setear los diferentes estados en los que puede entrar el UFO y las posiciones iniciales.
	{
	case 0: // Entrada oculto.
		UFOstate = OCULTO;
		posInicial = pos; // Guardamos la posicion inical para cuando lo reseteemos.
		break;
	case 1: // Entrada visible.
		UFOstate = VISIBLE;
		posInicial = Point2D<double>(800, pos.getY()); // Si entra visible no nos vale la posicion que nos llega entonces la ponemos manualmente.
		break;
	case 2: // Entrada destruido.
		UFOstate = DESTRUIDO;
		posInicial = Point2D<double>(800, pos.getY()); // Si entra destruido no nos vale la posicion que nos llega entonces la ponemos manualmente.
		break;
	default:
		break;
	}
	aprearanceTime = playST->getRandomRange(50, 100); // Para que salga mas rapido.
}

void UFO::update()
{
	if (UFOstate == VISIBLE)
	{
		position = position + Vector2D(-5.0, 0.0); // Movimiento.

		if (position.getX() <= -texture->getFrameWidth()) // Si pasa por el limite izquierdo se resetea para que vuelva a su posicion inicial.
		{
			reset(); // Reseteo.
		}

		// Update rect.
		rect.x = position.getX();
		rect.y = position.getY();
	}
	else if (UFOstate == DESTRUIDO)
	{
		// Rewards y bombas:
		if (playST->getRandomRange(0, MAX_APPEARANCE_PERCENTAJE) < proporcionBombas && !reward) {
			reward = true;
			playST->fireBomb(position);
		}
		else if (playST->getRandomRange(0, MAX_APPEARANCE_PERCENTAJE) > proporcionBombas && !reward) {
			reward = true;
			playST->fireReward(position);
		}

		// Timer para que el sprite del UFO destruido se quede en pantalla un poco.
		if (destroyTimer >= maxDestroyedTime)
		{
			destroyTimer = 0;
			reset(); // Reseteo.
		}
		destroyTimer++;
	}
	else if (UFOstate == OCULTO && appearCountDown >= aprearanceTime)
	{
		UFOstate = VISIBLE; // Si ha pasado el tiempo de espera se vuelve visible.
	}
	appearCountDown++;
}

void UFO::render() const
{
	if (UFOstate == VISIBLE) // textura del UFO cuando pasa por la pantalla.
	{
		texture->renderFrame(rect, texture->getNumRows() - 1, texture->getNumColumns() - 2);
	}
	else if (UFOstate == DESTRUIDO) // Si el UFO ha sido destruido le ponemos la textura que corresponde.
	{
		texture->renderFrame(rect, texture->getNumRows() - 1, texture->getNumColumns() - 1);
	}
}

void UFO::save(std::ostream& fil) const // Guarda: tipo-posicion-estado-tiempoParaAparecer.
{
	fil << ID_UFO << " " << position.getX() << " " << position.getY() << "  " << UFOstate << " " << appearCountDown << "\n";
}

bool UFO::hit(SDL_Rect _rect, char c)
{
	// Comprueba que el puntero al rect no sea igual a si mismo (para que un laser no colisione consigo mismo) y que no colisiones con una entidad igual (para los aliens).
	if ((&_rect) != (&rect) && c != entity) 
	{
		if (SDL_HasIntersection(&rect, &_rect))
		{
			//cout << "UFO: hit" << endl;
			UFOstate = DESTRUIDO; // Si ha sido alcanzado se cambia al estado de Destruido.
			playST->addScore(100);
			return true;
		}
	}
	return false;
}

void UFO::reset() // Pone el estado del UFO que le corresponde y modifica el eTime y la posicion de este.
{
	if (UFOstate == DESTRUIDO || UFOstate == VISIBLE)
	{
		reward = false;
		UFOstate = OCULTO;
		position = posInicial; // Lo movemos a su posicion inicial.
		rect.x = posInicial.getX(); // Actualizamos la posicion del rectangulo.
		rect.y = posInicial.getY(); // Actualizamos la posicion del rectangulo.
		appearCountDown = 0;
		aprearanceTime = playST->getRandomRange(50, 100); // Reiniciamos el tiempo para la siguiente espera.
	}
	else if (UFOstate == OCULTO)
	{
		UFOstate = VISIBLE;
	}
}