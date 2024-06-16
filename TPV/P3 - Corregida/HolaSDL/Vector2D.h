#pragma once
template <class T>

class Vector2D
{
private:

	T x;
	T y;

public:

	//------Constructoras y destructoras:

	// Constructora vacia.
	Vector2D() { Vector2D(0, 0); };
	// Constructora que recibe parametros.
	Vector2D(T a, T b) { x = a; y = b; }

	//------Getters y setters:

	// Devuelve la X.
	T getX() const { return x; }
	// Devuelve la Y.
	T getY() const { return y; }
	// Setea la X.
	void setX(T newX) { x = newX; }
	// Setea la Y.
	void setY(T newY) { y = newY }

	//------Sobrecargas de operadores:

	Vector2D operator+(Vector2D other) const
	{
		return Vector2D(x + other.x, y + other.y);
	}
	Vector2D operator-(Vector2D other) const
	{
		return Vector2D(x - other.x, y - other.y);
	}
	T operator*(Vector2D other) const
	{
		return ((x * other.x) + (y * other.y));
	}
	Vector2D operator*(T other) const
	{
		return Vector2D(other * x, other * y);
	}
};

template <class T>
using Point2D = Vector2D<T>;