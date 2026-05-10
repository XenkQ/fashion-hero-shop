# Feature: Widoczność - pakiety Growth VAS dla sellerów

OPPORTUNITY: Jako seller chcę inwestować mały budżet w rozwój sprzedaży na platformie i płacić za konkretne efekty.  
OUTCOME: Zwiększyć MRR z pakietów Growth VAS do 250 000 PLN miesięcznie w pół roku z 40% odnowień.

## Co budujemy & User Flow

Zakładka "Widoczność" (tylko zalogowany panel sellera) pokazująca nagłówek "Uwidocznij swoje produkty", pakiety Growth VAS i opcję ręcznej konfiguracji. Interfejs to makieta do badania zainteresowania – akcje otworzą zamykany popup powiadomienia, nie ma zapisywania zamówienia ani płatności.

## Kryteria akceptacji

- Interfejs w języku polskim.
- 3 karty pakietów: "Średni" (299 PLN, podst. widoczność, raport), "Wysoki" (599 PLN, więcej produktów, detale ofert), "Ultra Wysoki" (999 PLN, priorytet, pełne wsparcie i doradztwo).
- Każdy pakiet posiada przycisk "Wybierz".
- Pod kartami pakietów separator "lub", a pod nim karta "Skonfiguruj ręcznie" (bez ceny, dla preferujących pełną kontrolę).
- Desktop: pakiety widoczne obok siebie (jeśli jest miejsce).
- Mobile: karuzela startująca od 999 PLN. Strzałki: 999 PLN (w lewo), 599 PLN (obie), 299 PLN (w prawo).
- Kliknięcie "Wybierz" na pakiecie lub karcie pokazuje responsywny popup ("badamy zainteresowanie, powiadomimy wkrótce"). Zamykany ikoną "X" lub przyciskiem "OK".

## Czego NIE budujemy

- Zarządzania widocznością, płatności, faktur, subskrypcji.
- Panelu admina do pakietów, zbierania maili, analityki kliknięć.

## Przykłady

Input: Seller (desktop) klika "Wybierz" na karcie pakietu "Wysoki".  
Oczekiwany rezultat: Wyświetla się popup dziękujący za zainteresowanie. Nie uruchamia się bramka płatności.

Input: Seller otwiera widok na smartfonie.  
Oczekiwany rezultat: Widzi karuzelę pakietów startującą od 999 PLN, z możliwością przewinięcia strzałką w lewo do tańszych opcji.
