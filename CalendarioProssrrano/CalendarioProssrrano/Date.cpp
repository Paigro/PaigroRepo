#include "Date.h"


Date::Date()
	: day(-1), month(-1), year(-1)
{}

Date::Date(int d, int m, int y)
	: day(d), month(m), year(y)
{}

Date::~Date()
{

}

bool Date::isBisiesto(int year)
{
	return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int Date::getDaysInMonth(int month, int year)
{
	if (month == 2 && isBisiesto(year)) return 29;
	return daysInMonth[month - 1];
}

bool Date::isCorrect() const
{
	if (year < 0 || month < 1 || month > 12 || day < 1) { return false; }
	return day <= getDaysInMonth(month, year);
}

void Date::operator++()
{
	day++;
	if (day > getDaysInMonth(month, year))
	{
		day = 1;
		month++;
		if (month > 12)
		{
			month = 1;
			year++;
		}
	}
}

void Date::operator--()
{
	day--;
	if (day < 1) 
	{
		month--;
		if (month < 1) 
		{
			month = 12;
			year--;
		}
		day = getDaysInMonth(month, year);
	}
}

bool Date::operator==(const Date& other) const
{
	return day == other.day && month == other.month && year == other.year;
}

bool Date::operator!=(const Date& other) const
{
	return !(*this == other);
}