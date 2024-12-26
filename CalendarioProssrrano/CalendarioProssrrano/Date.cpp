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

int Date::daysInMonthFor(int month, int year)
{
	if (month == 2 && isBisiesto(year)) return 29;
	return daysInMonth[month - 1];
}

bool Date::isCorrect() const
{
	if (year < 0 || month < 1 || month > 12 || day < 1) { return false; }
	return day <= daysInMonthFor(month, year);
}

void Date::operator++()
{
	day++;
	if (day > daysInMonthFor(month, year))
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
	if (day < 1) {
		month--;
		if (month < 1) {
			month = 12;
			year--;
		}
		day = daysInMonthFor(month, year);
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

int Date::dateDifference(const Date& a, const Date& b)
{
	auto daysFromStart = [](const Date& date)
		{
			int days = date.year * 365 + date.day;
			for (int i = 1; i < date.month; ++i)
			{
				days += daysInMonthFor(i, date.year);
			}
			days += date.year / 4 - date.year / 100 + date.year / 400;
			return days;
		};
	return daysFromStart(b) - daysFromStart(a);
}
