# Questions:  

## Advanced Module technical:
- Kernel tuning - Linux Kernel Firewall: 
    - ( https://journey.study/v2/learn/courses/252/modules/29404/units/0/SOLO/15509 )
    - nem nagyon tudtam lecsekkolni, hogy sikerult-e (nem is nagyon ertem, mi a lenyeg)

## TW review:

- TodoDB feladat:
    - a syntaxxal volt gond, foleg a scripten belul (psql feluleten ment)
        - a peldakban levo eredeti `<<EOF` formatummal nem ment
    - masik syntaxot hasznalva mar mukodott, de akkor meg a parametrikus input nem ment

- Scriptekben feljott egy hiba:
    - "-bash: ./widgets.sh: /bin/bash^M: bad interpreter: No such file or directory"
    - ezzel kellett megoldani:
        - `sed -i 's/\r$//' list.sh`

- `sed` es `awk` syntax meg nagyon nem tiszta nekem

## AWS
- Instance user nevet hol kell beallitani? (ec2-user a default)

- a Service Security feladatban, miutan megvan az S3 bucket es EC2, es a kulcsokat is megcsinaltam, mit kell utana csinalni, hogy ezeket felhasznaljam? Errol nem ir semmit (Tehat hogyan tudom ezeket a kulcsokat utana hasznalni?)
https://journey.study/v2/learn/courses/252/modules/29404/units/1/SOLO/15204

## SI review DOCKER
- Introduction to Docker build (Nginx and Flask):
    - ez a feldat nem volt valami vilagos, de gondolom nem is ezen van a hangsuly, hanem a `docker compose`-on

## OPEN HOUR TEMA
- script iras
- minta pet projekt - miben mas, mint egy web app?