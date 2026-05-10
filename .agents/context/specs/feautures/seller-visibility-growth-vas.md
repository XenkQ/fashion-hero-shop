# Feature: Widoczność - pakiety Growth VAS dla sellerów

OPPORTUNITY: Jako seller chcę inwestować mały budżet w rozwój sprzedaży na platformie i płacić za konkretne efekty.  
OUTCOME: Zwiększyć MRR z pakietów Growth VAS do 250 000 PLN miesięcznie w pół roku z 40% odnowień.

## Co budujemy

Opcję "Widoczność" w istniejącym account dropdown dla zalogowanego konta sellera. Po kliknięciu seller widzi ekran z nagłówkiem "Uwidocznij swoje produkty", pakietami Growth VAS i opcją ręcznej konfiguracji. Interfejs to makieta do badania zainteresowania - akcje otwierają zamykany popup powiadomienia, nie ma zapisywania zamówienia ani płatności.

## User flow

1. Zalogowany seller otwiera istniejący account dropdown.
2. W dropdownie widzi opcję "Widoczność" i klika ją.
3. System pokazuje widok pakietów Growth VAS z nagłówkiem "Uwidocznij swoje produkty".
4. Seller wybiera pakiet lub opcję ręcznej konfiguracji.
5. System pokazuje responsywny popup informujący, że badamy zainteresowanie i powiadomimy wkrótce.

## Kryteria akceptacji

- Interfejs w języku polskim.
- Opcja "Widoczność" jest dostępna jako osobna pozycja w istniejącym account dropdown tylko dla zalogowanego konta sellera.
- Konta bez roli sellera nie widzą opcji "Widoczność" w account dropdown.
- 3 karty pakietów: "Średni" (299 PLN, podst. widoczność, raport), "Wysoki" (599 PLN, więcej produktów, detale ofert), "Ultra Wysoki" (999 PLN, priorytet, pełne wsparcie i doradztwo).
- Każdy pakiet posiada przycisk "Wybierz".
- Pod kartami pakietów separator "lub", a pod nim karta "Skonfiguruj ręcznie" (bez ceny, dla preferujących pełną kontrolę).
- Desktop: pakiety widoczne obok siebie (jeśli jest miejsce).
- Mobile: karuzela startująca od 999 PLN. Strzałki: 999 PLN (w lewo), 599 PLN (obie), 299 PLN (w prawo).
- Kliknięcie "Wybierz" na pakiecie lub karcie pokazuje responsywny popup ("badamy zainteresowanie, powiadomimy wkrótce"). Zamykany ikoną "X" lub przyciskiem "OK".

## Czego NIE budujemy

- Zarządzania widocznością, płatności, faktur, subskrypcji.
- Nowego panelu sellera ani panelu admina do pakietów.
- Zbierania maili, analityki kliknięć.

## Przykłady

Input: Seller (desktop) otwiera account dropdown, wybiera "Widoczność", a następnie klika "Wybierz" na karcie pakietu "Wysoki".  
Oczekiwany rezultat: Wyświetla się popup dziękujący za zainteresowanie. Nie uruchamia się bramka płatności.

Input: Seller otwiera widok na smartfonie.  
Oczekiwany rezultat: Widzi karuzelę pakietów startującą od 999 PLN, z możliwością przewinięcia strzałką w lewo do tańszych opcji.

Input: Kupujący bez roli sellera otwiera account dropdown.  
Oczekiwany rezultat: Nie widzi opcji "Widoczność".
