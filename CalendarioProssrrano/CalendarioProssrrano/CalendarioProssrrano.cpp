#include <iostream>
#include <string>
#include <array>

#include "PaigroConsole.h"
#include "ProssrranDate.h"


const Date REF_GREG_DATE(2, 11, 2019); // Fecha de referencia para el calendario Gregoriano.
const ProssrranDate REF_PSS_DATE(1, 1, 0, 1); // Fecha de referencia para el calendario Prossrrano.

const int DUR_BISYEAR_GREG = 366; // Duracion en dias del anyo bisiesto Gregoriano.
const int DUR_YEAR_GREG = 365; // Duracion en dias del anyo Gregoriano.

const int DUR_YEAR_PSS = 364; // Duracion en dias del anyo Prossrrano.
const int DUR_PHASE_PSS = 91; // Duracion en dias de una etapa Prossrrana.
const int DUR_NORMALMONTH_PSS = 9; // Duracion en dias de un mes normal Prossrrano.
const int DUR_LASTMONTH_PSS = 10; // Duracion en dias del ultimo mes Prossrrano.


#pragma region 1a version:

/*struct Date
{
private:

	bool bisiesto = false; // Si es anyo es bisioesto o no.
	bool isBisiesto()
	{
		return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	}

public:
	// Constructora por defecto de Date. Pone a -1 todo.
	Date()
		: day(-1), month(-1), year(-1), bisiesto(false)
	{}

	// Constructora dado un dia, mes y anyo de Date. Se calcula si es bisiesto.
	Date(int d, int m, int y)
		: day(d), month(m), year(y)
	{
		if (isBisiesto())
		{
			bisiesto = true;
		}
	}


	int day; // Dia.
	int month; // Mes.
	int year; // Anyo.

	bool operator==(const Date other) const
	{
		return day == other.day && month == other.month && year == other.year;
	}
	bool operator!=(const Date other) const
	{
		return day != other.day || month != other.month || year != other.year;
	}
	void operator++()
	{
		day++;
		switch (month)
		{
		case 1: case 3: case 5: case 7: case 8: case 10:
			if (day > 31) { day = 1; month++; }
			break;
		case 2:
			if (bisiesto)
			{
				if (day > 29) { day = 1; month++; }
			}
			else
			{
				if (day > 28) { day = 1; month++; }
			}
			break;
		case 4: case 6: case 9: case 11:
			if (day > 30) { day = 1; month++; }
			break;
		case 12:
			if (day > 31) { day = 1; month = 1; year++; bisiesto = isBisiesto(); }
			break;
		default:
			break;
		}
	}
	void operator--()
	{
		day--; // Decrementar el día.

		if (day < 1)
		{
			month--;
			if (month < 1)
			{
				month = 12; // Retroceder al último mes del año.
				year--; // Decrementar el año.
				bisiesto = isBisiesto(); // Actualizar el estado de bisiesto.
			}

			switch (month)
			{
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
				day = 31;
				break;
			case 4: case 6: case 9: case 11:
				day = 30;
				break;
			case 2:
				day = bisiesto ? 29 : 28;
				if (bisiesto)
				{
					day = 29;
				}
				else
				{
					day = 28;
				}
				break;
			default:
				break;
			}
		}
	}

	// Comprueba que la fecha es correcta.
	virtual bool isCorrect()
	{
		if (year < 0) { return false; }
		if (month < 0 || month>12) { return false; }
		if (day < 1) { return false; }
		switch (month)
		{
		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
			if (day > 31) { return false; }
			break;
		case 2:
			if (bisiesto)
			{
				if (day > 29) { return false; }
			}
			else
			{
				if (day > 28) { return false; }
			}
			break;
		case 4: case 6: case 9: case 11:
			if (day > 30) { return false; }
			break;
		default:
			break;
		}
		return true;
	}
	void changeDate(int d, int m, int y)
	{
		day = d;
		month = m;
		year = y;
		if (isBisiesto())
		{
			bisiesto = true;
		}
	}
};

struct ProssrranDate : public Date
{
public:
	// Constructora por defecto de ProssrranDate. Pone a -1 todo.
	ProssrranDate()
		: Date(), phase(-1)
	{}

	// Constructora dado un dia, mes, anyo de ProssrranDate. Se calcula si es bisiesto.
	ProssrranDate(int d, int m, int y, int ph)
		: Date(d, m, y)
	{
		phase = ph;
	}

	int phase; // Etapa del anyo prossrrano.

	bool isCorrect() override
	{
		if (phase < 0 || phase > 4) { return false; }
		return Date::isCorrect();
	}

	void changeDate(int d, int m, int y, int ph)
	{
		phase = ph;
		Date::changeDate(d, m, y);
	}

	bool operator==(const ProssrranDate other) const
	{
		return day == other.day && month == other.month && year == other.year && phase == other.phase;
	}
	bool operator!=(const ProssrranDate other) const
	{
		return day != other.day || month != other.month || year != other.year || phase != other.phase;
	}
	void operator++()
	{
		day++;
		switch (month)
		{
		case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9:
			if (day > 9) { day = 1; month++; }
			break;
		case 10:
			if (day > 10) { day = 1; month = 1; phase++; }
			break;
		default:
			alert("Algo mal en el ++ de Pss.");
			break;
		}

		if (phase > 4) { phase = 1; year++; }
	}
	void operator--()
	{
		day--; // Decrementar el día.

		if (day < 1)
		{
			switch (month)
			{
			case 1:
				day = 10;
				month = 10;
				phase--;
				break;
			case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
				day = 9;
				month--;
				break;
			default:
				alert("Algo mal en el -- de Pss.");
				break;
			}
			if (phase < 1)
			{
				phase = 4;
				year--;
			}
		}
	}
};*/






/*int dateDifference(Date date)
{
	Date aux = date;
	int daysDif = 0;

	if (aux == REF_GREG_DATE) { return 0; }

	if (date.year < REF_GREG_DATE.year) // Cuando el anyo es antes de la referencia.
	{
		while (aux != REF_GREG_DATE)
		{
			++aux;
			daysDif--;
		}
	}
	else if (date.year > REF_GREG_DATE.year) // Cuando el anyo es despues de la referencia.
	{
		while (aux != REF_GREG_DATE)
		{
			--aux;
			daysDif++;
		}
	}
	else if (date.year == REF_GREG_DATE.year) // Cuando el anyo es el de la referencia.
	{
		// Compara el mes
		if (date.month < REF_GREG_DATE.month)
		{
			// La fecha es antes de la de referencia, contar días retrocediendo
			while (aux != REF_GREG_DATE)
			{
				++aux;
				daysDif--;
			}
		}
		else if (date.month > REF_GREG_DATE.month)
		{
			// La fecha es después de la de referencia, contar días avanzando
			while (aux != REF_GREG_DATE)
			{
				--aux;
				daysDif++;
			}
		}
		else if (date.month == REF_GREG_DATE.month) // Si el mes es el mismo
		{
			// Compara el día
			if (date.day < REF_GREG_DATE.day)
			{
				// La fecha es antes de la de referencia, contar días retrocediendo
				while (aux != REF_GREG_DATE)
				{
					++aux;
					daysDif--;
				}
			}
			else if (date.day > REF_GREG_DATE.day)
			{
				// La fecha es después de la de referencia, contar días avanzando
				while (aux != REF_GREG_DATE)
				{
					--aux;
					daysDif++;
				}
			}
		}
	}
	return daysDif;
}



ProssrranDate converToProssrran(Date date)
{
	// Convierte la fecha data a la fecha prossrrana.
	int daysDiff = dateDifference(date);
	justText(std::to_string(daysDiff));
	ProssrranDate pssDate = REF_PSS_DATE;

	if (daysDiff < 0)
	{
		for (size_t i = 0; i < (-daysDiff); i++)
		{
			--pssDate;
			//std::cout << pssDate.day << "-" << pssDate.month << "-" << pssDate.year << "(" << pssDate.phase << ")" << std::endl;
		}
	}
	else if (daysDiff > 0)
	{
		for (size_t i = 0; i < daysDiff; i++)
		{
			++pssDate;
			//std::cout << pssDate.day << "-" << pssDate.month << "-" << pssDate.year << "(" << pssDate.phase << ")" << std::endl;
		}
	}

	return pssDate;
}

ProssrranDate ajuste(Date date)
{
	Date refAjuste(18, 6, 2020);
	if (date.day == refAjuste.day && date.month == refAjuste.month && date.year == refAjuste.year)
	{
		date.day -= 2;
	}
	return converToProssrran(date);
}

int main()
{
	message("Buenos dias. Sea bienvenido a este programa para\nconvertir fechas del calendario gregoriano al calendario Prossrrano.");
	alert("Las fechas calculadas estan bien, las fechas de las agendas\ndel 2020 para arriba tienen un desfase de 2 dias.");
	separator();


	int day = 0;
	int month = 0;
	int year = 0;
	ProssrranDate finalDate;


	message("Escriba la fecha que quiera convertir a prossrrano:");
	std::cin >> day >> month >> year;
	Date dateToCheck(day, month, year);


	while (!dateToCheck.isCorrect())
	{
		error("Fecha incorrecta.");
		message("Introduzca una fecha correcta:");
		std::cin >> day >> month >> year;
		dateToCheck.changeDate(day, month, year);
	}

	finalDate = converToProssrran(dateToCheck);

	std::string fecha = std::to_string(finalDate.day) + "/" + std::to_string(finalDate.month) + "/" + std::to_string(finalDate.year) + " (" + std::to_string(finalDate.phase) + "/4)";

	message("La fecha es: " + fecha + ".");

	return 356;
}*/

#pragma endregion

#pragma region 2a region:

ProssrranDate convertToProssrran(const Date& date)
{
	int daysDiff = Date::dateDifference(REF_GREG_DATE, date);
	ProssrranDate result = REF_PSS_DATE;

	if (daysDiff > 0)
	{
		for (int i = 0; i < daysDiff; ++i)
		{
			++result;
		}
	}
	else
	{
		for (int i = 0; i < -daysDiff; ++i)
		{
			--result;
		}
	}

	return result;
}

int main()
{
	message("Buenos dias. Sea bienvenido a este programa para\nconvertir fechas del calendario gregoriano al calendario Prossrrano.");
	alert("Las fechas calculadas estan bien, las fechas de las agendas\ndel 2020 para arriba tienen un desfase de 2 o mas dias.");
	separator();

	int day = -1;
	int month = -1;
	int year = -1;


	message("Escriba la fecha que quiera convertir a prossrrano:");
	std::cin >> day >> month >> year;
	Date dateToCheck(day, month, year);

	while (!dateToCheck.isCorrect())
	{
		error("Fecha incorrecta.");
		message("Introduzca una fecha correcta:");
		std::cin >> day >> month >> year;
		Date dateToCheck(day, month, year);
	}
	ProssrranDate pssDate = convertToProssrran(dateToCheck);
	std::string fecha = std::to_string(pssDate.getDay()) + "/" + std::to_string(pssDate.getMonth()) + "/" + std::to_string(pssDate.getYear()) + " (" + std::to_string(pssDate.getPhase()) + "/4)";

	message("Fecha prossrrana: " + fecha + ".");

	return 0357;
}

#pragma endregion