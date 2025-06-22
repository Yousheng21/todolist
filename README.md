## Тестовое задание для компании basic.tech на должность react-native разработчик
### Android
Необходимо добавить файл local.proporties в корень папки android с подобным содержимым
``` sdk.dir = /Users/{name}/Library/Android/sdk ```
Затем запускать ч отурытым эмулятором android studio
```sh
yarn android
```
Если возникнут ошибку можно попробовать очистить кеш и стартануть заново
```sh
cd android && ./gradlew clean
```
### iOS

Для начала подгрузить подсы

```sh
cd ios && pod install
```
И запустить сборку
```sh
yarn ios
```
##
### Прикрепляю скриншоты:
### Android
![alt text](/app//assets//Screenshot_1750595598.png)
### IOS
![alt text](/app//assets//Simulator%20Screenshot%20-%20iPhone%2015%20-%202025-06-22%20at%2015.32.27.png)