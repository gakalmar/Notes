# Questions:  

redo task: Linux permissions (log john in)

## Advanced module basic:

- Sokszor belefutottam a Putty-ba, ezt kell hasznalnunk?

## Advanced Module technical:
- Kernel tuning - Linux Kernel Firewall: 
    - ( https://journey.study/v2/learn/courses/252/modules/29404/units/0/SOLO/15509 )
    - nem nagyon tudtam lecsekkolni, hogy sikerult-e (nem is nagyon ertem, mi a lenyeg)

## TW review:
- Text and file manipulation
https://journey.study/v2/learn/courses/252/modules/29404/units/0/TEAM/14990
    - `sed 's/^[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\./XXX.XXX.XXX./' access.log`
    - `sed -E 's|([0-9]{1,3}\.){3}|XXX.XXX.XXX.|' access.log`
    - Regexet mennyire kellene ertenunk?

- TodoDB feladat:
    - a syntaxxal volt gond, foleg a scripten belul (psql feluleten ment)
        - a peldakban levo eredeti `<<EOF` formatummal nem ment
    - masik syntaxot hasznalva mar mukodott, de akkor meg a parametrikus input nem ment

- Scriptekben feljott egy hiba:
    - "-bash: ./widgets.sh: /bin/bash^M: bad interpreter: No such file or directory"
    - ezzel kellett megoldani:
        - `sed -i 's/\r$//' list.sh`

- `sed` es `awk` syntax meg nagyon nem tiszta nekem