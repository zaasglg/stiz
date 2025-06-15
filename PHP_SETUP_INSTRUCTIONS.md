# Инструкция по настройке PHP отправки писем

## Шаг 1: Установка PHPMailer

Выполните в терминале в папке проекта:

```bash
cd /Users/erdaulet/Desktop/stiz
composer install
```

Если у вас нет Composer, установите его:
```bash
# Установка Composer (macOS)
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

## Шаг 2: Настройка SMTP

В файле `send_order.php` замените настройки на ваши:

### Для Gmail:
```php
$mail->Host       = 'smtp.gmail.com';
$mail->Username   = 'your-email@gmail.com';     // Ваша Gmail почта
$mail->Password   = 'your-app-password';        // Пароль приложения Gmail
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;
```

### Как получить пароль приложения Gmail:
1. Зайдите в настройки Google аккаунта
2. Безопасность > Двухэтапная аутентификация
3. Пароли приложений > Создать новый пароль
4. Выберите "Почта" и "Другое устройство"
5. Скопируйте сгенерированный пароль

### Для Mail.ru:
```php
$mail->Host       = 'smtp.mail.ru';
$mail->Username   = 'your-email@mail.ru';       // Ваша Mail.ru почта
$mail->Password   = 'your-password';            // Пароль от Mail.ru
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;
```

### Для Yandex:
```php
$mail->Host       = 'smtp.yandex.ru';
$mail->Username   = 'your-email@yandex.ru';     // Ваша Yandex почта
$mail->Password   = 'your-password';            // Пароль от Yandex
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = 587;
```

## Шаг 3: Запуск локального сервера

Для тестирования запустите PHP сервер:

```bash
cd /Users/erdaulet/Desktop/stiz
php -S localhost:8000
```

Затем откройте в браузере: http://localhost:8000

## Шаг 4: Настройка на хостинге

1. Загрузите все файлы на хостинг
2. Выполните `composer install` на сервере или загрузите папку `vendor`
3. Настройте SMTP параметры в `send_order.php`
4. Убедитесь, что хостинг поддерживает отправку писем

## Структура файлов:

```
stiz/
├── send_order.php          # PHP скрипт отправки
├── composer.json           # Зависимости
├── vendor/                 # PHPMailer библиотеки (после composer install)
├── js/index.js            # JavaScript (обновлен для PHP)
└── index.html             # Основная страница
```

## Тестирование:

1. Откройте сайт
2. Нажмите "Заказть" на любом товаре
3. Заполните форму и отправьте
4. Проверьте почту n4msin@mail.ru
5. В консоли браузера не должно быть ошибок

## Возможные проблемы:

- **CORS ошибки**: Запускайте через PHP сервер, а не file://
- **SMTP ошибки**: Проверьте настройки почты и пароли
- **500 ошибка**: Проверьте логи сервера, возможно PHPMailer не установлен

## Безопасность:

- Не храните пароли в открытом виде
- Используйте переменные окружения для чувствительных данных
- Добавьте проверку CSRF токенов для продакшна
