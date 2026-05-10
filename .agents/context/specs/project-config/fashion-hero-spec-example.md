## Cel aplikacji

FashionHero łączy niezależnych sprzedawców mody z kupującymi. Model przychodowy: 22% prowizji od transakcji. Aktualny focus: obniżenie 38% wskaźnika zwrotów (strona kosztowa) i dywersyfikacja przychodów poza prowizję (strona przychodowa).

## Wytyczne designu

- Czysty, nowoczesny styl marketplace. Think Zalando, nie Allegro.
- Używaj istniejących komponentów z aplikacji dla zachowania spójności z resztą designu. Nie buduj custom UI gdy istnieje komponent w projekcie.
- Mobile-first responsive design. Większość kupujących przegląda na telefonach.
- Zdjęcia produktów to główna treść - daj im przestrzeń, nie zaśmiecaj wokół.

## Styl kodu

- TypeScript strictly - żadnych typów any
- Używaj istniejących komponentów i wzorców z codebase zamiast tworzyć nowe od zera

## Reguły domenowe

- Sprzedawcy to niezależne sklepy, nie pracownicy FashionHero
- Polityka zwrotów: darmowe zwroty w ciągu 14 dni (FashionHero płaci ~15 PLN za zwrot)
- Średnia wartość zamówienia: ~200 PLN. Średnia prowizja: ~44 PLN.

## Granice

ALWAYS:

- Dodawaj stany ładowania i błędów dla operacji asynchronicznych
- Pokazuj empty states (nie zepsute layouty) gdy brakuje danych
- Zachowuj istniejącą funkcjonalność przy dodawaniu nowych feature'ów
- Używaj istniejących komponentów UI dla spójności z resztą aplikacji

ASK FIRST:

- Przed zmianą jakiegokolwiek flow checkout/płatności
- Przed modyfikacją autentykacji użytkowników
- Przed dodaniem nowej biblioteki lub zależności
- Przed zmianą struktury bazy danych
- Przed zmianą nawigacji lub layoutu strony

NEVER:

- Nie pokazuj danych finansowych sprzedawcy (marże, prowizje) kupującym
- Nie hardcoduj cen ani logiki biznesowej która powinna być w bazie danych
- Nie usuwaj ani nie modyfikuj istniejących feature'ów, komponentów ani styli chyba że użytkownik o to poprosi
- Nie zmieniaj istniejącego kodu który nie jest bezpośrednio związany z aktualnym zadaniem
