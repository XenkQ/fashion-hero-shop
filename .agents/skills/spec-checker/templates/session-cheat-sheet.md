# Ściąga na sesję budowania

> Tego nie wklejasz nigdzie. To karta referencyjna którą trzymasz otwartą obok Lovable.

## RÓB
- Zacznij od "zaplanujmy zanim zaczniemy kodować" / użyj Plan Mode
- Dawaj jedno zadanie naraz, weryfikuj przed przejściem do następnego
- W każdym poleceniu dodaj krok testowy/sprawdzający
- Odwołuj się do Feature Spec po nazwie ("zgodnie ze specyfikacją, user powinien widzieć X")
- Gdy output jest zły: uprość prompt, nie dodawaj więcej szczegółów

## NIE RÓB
- Nie wklejaj całego kodu jako kontekst
- Nie pakuj kilku feature'ów w jeden prompt ("a przy okazji jeszcze...")
- Nie specyfikuj szczegółów implementacji (niech AI wybierze JAK)
- Nie łącz więcej niż 1-2 technik promptowania naraz (łączenie się kasuje)
- Nie ciągnij długiej konwersacji gdy jakość outputu spada (zacznij nową)

## GDY OUTPUT JEST ZŁY
1. Sprawdź: czy przekroczyłem ~200 słów instrukcji?
2. Sprawdź: czy łączę kilka poleceń naraz?
3. Spróbuj: prostszy prompt, mniej ograniczeń
4. Spróbuj: nowa konwersacja (context rot jest realny po ~20% okna kontekstu)
5. Spróbuj: rozbij zadanie na mniejsze kawałki
