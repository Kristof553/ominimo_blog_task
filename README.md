Installáció:

    - Létre kell hozni egy .env-et a root mappában a következő változókkal a .env.example alapján.

    - A backend mappában lévő .env adatbázis részét is kikell egészíteni a .env.example alapján.

    - Ezután elég futtatni a következő paracsont a root mappánál megnyitott terminálban:

        docker-compose up -d --build
        
        (Ez felépíti a szükséges kontéreket)

    -Felépítás után ezen az url-en lesz elérhető:
            
        http://localhost:5173/

Ha felépültek a konténerek az adatbázis migrálásához seedeléséhez a következő parancsokat kell futattni a laravel konténerén belül:

    php artisan migrate
    php artisan db:seed

Az oldal főbb funkciói:
    
    - A seedelés létrehoz 10-10 usert és post ot és egy admin usert amivel belehet jelentkezni (admin@gmail.com, yourpassword)
    - Hozzálehet adni új posztot, és kommentelni is lehet alá.
    - Ha kitörölnek egy posztot a kommenteket is törli amik hozzátartoznak.
    - Posztot csak akkor lehet törölni ha a létrhozója törli vagy admin joga van a felhasználónak ez igaz a komment részre is.
    - Szerkezteni egy posztot szintén csak a poszt létrhozója tud vagy admin felhasználó.


    

