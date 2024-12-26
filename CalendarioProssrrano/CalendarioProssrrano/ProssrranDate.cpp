#include "ProssrranDate.h"

ProssrranDate::ProssrranDate()
	: Date(), phase(-1)
{}

ProssrranDate::ProssrranDate(int d, int m, int y, int ph)
	: Date(d, m, y), phase(ph)
{}

bool ProssrranDate::isCorrect() const
{
	if (phase < 1 || phase > 4) { return false; }
	if (month < 1 || month>10) { return false; }
	if (month == 10 && day > 10) { return false; }
	if (month != 10 && day > 9) { return false; }

	return  true;
}

void ProssrranDate::operator++()
{
	day++;
	if (phase == 4 && month == 10 && day > 10)
	{
		day = 1;
		month = 1;
		phase = 1;
		year++;
	}
	else if ((month < 10 && day > 9) || (month == 10 && day > 10))
	{
		day = 1;
		month++;
		if (month > 10)
		{
			month = 1;
			phase++;
		}
	}
}

void ProssrranDate::operator--()
{
	day--;
	if (day < 1)
	{
		if (month == 1 && phase == 1) // Cambio de anyo.
		{
			year--;
			day = 10;
			month = 10;
			phase = 4;
		}
		else if (month > 1) // Cambio de mes.
		{
			month--;
			day = (month == 10) ? 10 : 9;
		}
		else // Cambio de etapa.
		{
			phase--;
			day = 10;
			month = 10;
		}
	}
}