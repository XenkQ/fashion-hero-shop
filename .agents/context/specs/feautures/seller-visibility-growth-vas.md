# Feature: Widoczność - pakiety Growth VAS dla sellerów

OPPORTUNITY: Jako mały lub średni seller chcę móc inwestować małe, kontrolowane budżety w rozwój sprzedaży na platformie, bo nie mam skali dużych marek ani pozycji negocjacyjnej, ale jestem gotów płacić za konkretne efekty.  
OUTCOME: Zwiększyć MRR z kontrolowanych pakietów Growth VAS kupowanych przez małych i średnich sellerów z 0 PLN do 250 000 PLN miesięcznie w pół roku, przy minimum 40% odnowień po pierwszym miesiącu.

## Co budujemy

Nowa zakładka "Widoczność" w panelu sprzedawcy. Seller widzi nagłówek "Uwidocznij swoje produkty", trzy miesięczne pakiety Growth VAS: "Średni" za 299 PLN, "Wysoki" za 599 PLN i "Ultra Wysoki" za 999 PLN, a pod nimi separator z napisem "lub", który oddziela pakiety od alternatywnej karty "Skonfiguruj ręcznie". Każda opcja pozwala wyrazić zainteresowanie, ale nie uruchamia jeszcze płatności, subskrypcji ani realnego zarządzania widocznością produktów.

## User flow

1. Zalogowany seller otwiera zakładkę "Widoczność" w panelu sprzedawcy.
2. System pokazuje panel "Uwidocznij swoje produkty" z trzema pakietami, separatorem "lub" pod pakietami i kartą "Skonfiguruj ręcznie" pod separatorem.
3. Seller klika "Wybierz" przy pakiecie albo kartę "Skonfiguruj ręcznie".
4. System pokazuje popup z podziękowaniem i informacją, że obecnie badamy zainteresowanie ofertą oraz poinformujemy sellera, gdy opcja zwiększania widoczności wejdzie w życie.
5. Seller zamyka popup iksem w prawym górnym rogu albo przyciskiem "OK".

## Kryteria akceptacji

- Zakładka "Widoczność" jest dostępna wyłącznie w panelu sprzedawcy dla zalogowanych sprzedawców.
- Cały UI nowego panelu, kart, przycisków i popupu jest po polsku.
- Panel zawiera nagłówek "Uwidocznij swoje produkty", trzy karty pakietów "Średni" 299 PLN, "Wysoki" 599 PLN i "Ultra Wysoki" 999 PLN oraz kartę "Skonfiguruj ręcznie".
- Pakiet "Średni" opisuje podstawowe zwiększenie widoczności wybranych produktów, miesięczne podsumowanie wyników i proste rekomendacje poprawy ofert.
- Pakiet "Wysoki" opisuje szerszą widoczność dla większej liczby produktów, bardziej szczegółowy raport miesięczny i rekomendacje dotyczące zdjęć, opisów, cen oraz produktów z podwyższonym ryzykiem zwrotu.
- Pakiet "Ultra Wysoki" opisuje najwyższy zakres widoczności, priorytetowe miejsca ekspozycji w ramach dostępnych powierzchni, rozszerzony raport miesięczny i pełny zestaw rekomendacji rozwoju ofert dla kluczowych produktów sellera.
- Każda karta pakietu ma przycisk "Wybierz".
- Pod kartami pakietów widoczny jest separator z napisem "lub"; separator nie jest częścią żadnej karty pakietu.
- Pod separatorem "lub" widoczna jest osobna karta "Skonfiguruj ręcznie" bez ceny, z opisem dla sellerów, którzy chcą mieć pełną kontrolę nad parametrami widoczności produktów.
- Na szerokich ekranach trzy pakiety są widoczne jako karty obok siebie, jeśli mieszczą się w dostępnej szerokości.
- Gdy karty pakietów nie mieszczą się na ekranie, wyświetlają się jako karuzela startująca od najdroższego pakietu 999 PLN.
- W karuzeli karta 999 PLN ma tylko strzałkę w lewo, karta 599 PLN ma strzałki w lewo i w prawo, a karta 299 PLN ma tylko strzałkę w prawo.
- Kliknięcie "Wybierz" przy dowolnym pakiecie pokazuje responsywny popup z informacją o przyjęciu zainteresowania.
- Kliknięcie karty "Skonfiguruj ręcznie" pokazuje ten sam responsywny popup.
- Popup działa na mniejszych ekranach i można go zamknąć iksem w prawym górnym rogu albo przyciskiem "OK".
- Kliknięcie opcji nie zapisuje zamówienia, nie uruchamia płatności i nie tworzy subskrypcji.

## Czego NIE budujemy

- Systemu zarządzania widocznością produktów.
- Systemu subskrypcyjnego.
- Zapisu maili sprzedawców.
- Panelu administracyjnego do zarządzania produktami albo pakietami.
- Płatności, fakturowania ani automatycznego odnawiania pakietów.
- Analityki kliknięć w pakiety lub kartę "Skonfiguruj ręcznie".

## Przykłady

Input: Seller jest zalogowany do panelu sprzedawcy, otwiera zakładkę "Widoczność" i klika "Wybierz" przy pakiecie "Wysoki" za 599 PLN.  
Oczekiwany rezultat: Seller widzi popup z podziękowaniem za zainteresowanie i informacją, że platforma bada zainteresowanie ofertą oraz poinformuje go, gdy zwiększanie widoczności wejdzie w życie.

Input: Seller otwiera zakładkę "Widoczność" na telefonie i widzi karuzelę pakietów startującą od pakietu "Ultra Wysoki" za 999 PLN.  
Oczekiwany rezultat: Seller może przejść strzałką w lewo do pakietu "Wysoki", potem do pakietu "Średni", a wybór dowolnej opcji pokazuje ten sam responsywny popup.
