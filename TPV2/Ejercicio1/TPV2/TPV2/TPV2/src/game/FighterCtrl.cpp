#include "FighterCtrl.h"

#include "../sdlutils/InputHandler.h"
#include "GameManager.h"

FighterCtrl::FighterCtrl() {}
FighterCtrl::~FighterCtrl() {}

void FighterCtrl::handleInput(Container* o) {
	//------PARTE3:
	auto& inhdlr = ih();

	if (inhdlr.keyDownEvent()) {
		if (inhdlr.isKeyDown(SDLK_LEFT)) {
			o->setRotation(o->getRotation() - 5.0f); // Rotacion a la izquierda.
		}
		else if (inhdlr.isKeyDown(SDLK_RIGHT)) {
			o->setRotation(o->getRotation() + 5.0f); // rotacion a la derecha.
		}
	}
}