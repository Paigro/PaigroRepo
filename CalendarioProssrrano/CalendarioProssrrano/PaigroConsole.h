#pragma once

#include <iostream>


/*//------ANSI codes:

"\033[x;x;xm texto

//----Texto:
//--Negro:			30
//--Rojo:			31
//--Verde:			32
//--Amarillo:		33
//--Azul			34
//--Magenta:		35
//--Cian:			36
//--Blanco:			37

//----Fondo:
//--Rojo:			41
//--Verde:			42
//--Amarillo:		43
//--Azul:			44
//--Magenta:		45
//--Cian:			46
//--Blanco:			47

//----Formatos:
//--Negrita:		 1
//--Subrayado:		 4
//--Invertir:		 7
//--Tachado:		 9

//----Reset:
//--Reset:		     0
*/


// Escribe un mensaje de tipo ERROR.
void error(const std::string& errorText)
{
	std::cout << "\033[31m//------ERROR: " << errorText << "\n\033[0m";
}

// Escribe un mensaje de tipo AVISO.
void alert(const std::string& alertText)
{
	std::cout << "\033[33m//----AVISO: " << alertText << "\n\033[0m";
}

// Escribe un mensaje de tipo MENSAJE.
void message(const std::string& messageText)
{
	std::cout << "\033[32m//--MENSAJE: " << messageText << "\n\033[0m";
}

// Esribe un texto.
void justText(const std::string& text)
{
	std::cout << text << "\n";
}

// Escribe un separador.
void separator(const std::string& separatorText)
{
	std::cout << "\033[36m//------------------" << separatorText << "------------------// " << "\n\033[0m";
}

// Escribe una funcionalidad que falta:
void missingFun(const std::string& missingFunText) 
{
	std::cout << "\033[35m//--------FUNCIONALIDAD POR HACER: " << missingFunText << "\n\033[0m";
}