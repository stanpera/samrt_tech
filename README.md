# WYMAGANE ZMIENNE ŚRODOWISKOWE

DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]?schema=public
DIRECT_URL=postgresql://[user]:[password]@[host]:[port]/[database]?schema=public

NODE_ENV=[ production | development ]
IMGBB_KEY=(tylko do w przypadku wysyłania zdjęcia do avatara profilowego)
CURRENCY_API_KEY=[na_https://api.currencyfreaks.com]
NEXT_PUBLIC_APP_URL=[np. http://localhost:3000]

NEXTAUTH_URL=
NEXTAUTH_SECRET==

OPENAI_API_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

POSTGRES_USER_DOCKER_COMPOSE=
SMART_TECH_PASSWORD_DOCKER_COMPOSE=
POSTGRES_DB_DOCKER_COMPOSE=

- Konto z uploadowanym avatartm: user: hans@hans.us password: Hans#1

# UPDATE FUNKCJONALNOŚCI I DEBUGOWANIE

W wersji poprawionej dodano:

1. Chat GPT na stronie Products, nad funkcją sortowania produktów. Chat przeszukuje bazę produktów na podstawie udzielonych mu informacji. Jego zadaniem jest znaleźć odpowiedni produkt lub kilka produktów na podstawie przekazanych informacji przez użytkownika.

2. Bramka płatności STRIPE. W danych do płatności, tj. karta należy podać dane testowe. Np. nr konta: 4242424242424242, CVC [trzy dowolne cyfry], data [dowolna data w przód].

3. Subiektywnie, największy problem, jeśli chodzi o bugi, które zostały wykryte to optymalizacja strony pod względem prędkości. Kwestia użycia use server oraz use clien w pewnych miejscach pozostaje niejasna. Pozostałe błędy zostały namierzone i mam nadzieję w większym stopniu usunięte.
